#!/usr/bin/env python3
"""
Font Inspector - fontTools-based font analysis for multi-language support

"""

import sys
import json
import os
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.feaLib.parser import Parser
from fontTools.unicode import Unicode
import unicodedata

class FontInspector:
    """Main font analysis class using fontTools"""
    
    def __init__(self, font_path):
        self.font_path = Path(font_path)
        self.font = TTFont(font_path)
        self.cmap = self.font.getBestCmap()
        
    def get_basic_info(self):
        """Extract basic font information"""
        name_table = self.font['name']
        
        # Get font names in order of preference
        family_name = self._get_name_record(name_table, 1) or self._get_name_record(name_table, 16)
        subfamily_name = self._get_name_record(name_table, 2) or self._get_name_record(name_table, 17)
        postscript_name = self._get_name_record(name_table, 6)
        
        # Get weight from OS/2 table
        weight = 400  # default
        if 'OS/2' in self.font:
            weight = self.font['OS/2'].usWeightClass
            
        return {
            'familyName': family_name,
            'subfamilyName': subfamily_name,
            'postscriptName': postscript_name,
            'weight': weight,
            'style': self._normalize_style(subfamily_name),
            'stretch': self._extract_stretch(family_name, subfamily_name),
            'unitsPerEm': self.font['head'].unitsPerEm,
            'numGlyphs': self.font.getGlyphSet().len() if hasattr(self.font.getGlyphSet(), 'len') else len(self.font.getGlyphSet()),
        }
    
    def get_metrics(self):
        """Extract font metrics"""
        head = self.font['head']
        hhea = self.font['hhea']
        os2 = self.font.get('OS/2')
        
        metrics = {
            'unitsPerEm': head.unitsPerEm,
            'ascent': hhea.ascent,
            'descent': hhea.descent,
            'lineGap': hhea.lineGap,
            'bbox': {
                'minX': head.xMin,
                'minY': head.yMin,
                'maxX': head.xMax,
                'maxY': head.yMax
            }
        }
        
        if os2:
            metrics.update({
                'capHeight': os2.sCapHeight,
                'xHeight': os2.sxHeight,
            })
            
        return metrics
    
    def get_opentype_features(self):
        """Extract OpenType features from GSUB and GPOS tables"""
        features = set()
        
        # GSUB features (substitution)
        if 'GSUB' in self.font:
            gsub = self.font['GSUB']
            if hasattr(gsub.table, 'FeatureList') and gsub.table.FeatureList:
                for feature_record in gsub.table.FeatureList.FeatureRecord:
                    features.add(feature_record.FeatureTag)
        
        # GPOS features (positioning)
        if 'GPOS' in self.font:
            gpos = self.font['GPOS']
            if hasattr(gpos.table, 'FeatureList') and gpos.table.FeatureList:
                for feature_record in gpos.table.FeatureList.FeatureRecord:
                    features.add(feature_record.FeatureTag)
        
        return sorted(list(features))
    
    def get_stylistic_sets(self):
        """Extract stylistic sets information"""
        features = self.get_opentype_features()
        stylistic_sets = []
        
        for feature in features:
            if feature.startswith('ss') and feature[2:].isdigit():
                set_num = int(feature[2:])
                if 1 <= set_num <= 20:
                    stylistic_sets.append({
                        'tag': feature,
                        'name': f'Stylistic Set {set_num}',
                        'description': ''  # Empty as requested
                    })
        
        return stylistic_sets
    
    def get_unicode_coverage(self):
        """Analyze Unicode block coverage for language support"""
        if not self.cmap:
            return []
        
        # Define Unicode blocks for major writing systems with script mappings
        unicode_blocks = [
            {'name': 'Basic Latin', 'start': 0x0000, 'end': 0x007F, 'script': 'Latin'},
            {'name': 'Latin-1 Supplement', 'start': 0x0080, 'end': 0x00FF, 'script': 'Latin'},
            {'name': 'Latin Extended-A', 'start': 0x0100, 'end': 0x017F, 'script': 'Latin'},
            {'name': 'Latin Extended-B', 'start': 0x0180, 'end': 0x024F, 'script': 'Latin'},
            {'name': 'Latin Extended Additional', 'start': 0x1E00, 'end': 0x1EFF, 'script': 'Latin'},
            {'name': 'Cyrillic', 'start': 0x0400, 'end': 0x04FF, 'script': 'Cyrillic'},
            {'name': 'Cyrillic Supplement', 'start': 0x0500, 'end': 0x052F, 'script': 'Cyrillic'},
            {'name': 'Greek and Coptic', 'start': 0x0370, 'end': 0x03FF, 'script': 'Greek'},
            {'name': 'Arabic', 'start': 0x0600, 'end': 0x06FF, 'script': 'Arabic'},
            {'name': 'Arabic Supplement', 'start': 0x0750, 'end': 0x077F, 'script': 'Arabic'},
            {'name': 'Hebrew', 'start': 0x0590, 'end': 0x05FF, 'script': 'Hebrew'},
            {'name': 'Devanagari', 'start': 0x0900, 'end': 0x097F, 'script': 'Devanagari'},
            {'name': 'Bengali', 'start': 0x0980, 'end': 0x09FF, 'script': 'Bengali'},
            {'name': 'Thai', 'start': 0x0E00, 'end': 0x0E7F, 'script': 'Thai'},
            {'name': 'Hiragana', 'start': 0x3040, 'end': 0x309F, 'script': 'Japanese'},
            {'name': 'Katakana', 'start': 0x30A0, 'end': 0x30FF, 'script': 'Japanese'},
            {'name': 'CJK Unified Ideographs', 'start': 0x4E00, 'end': 0x9FFF, 'script': 'CJK'},
            {'name': 'Hangul Syllables', 'start': 0xAC00, 'end': 0xD7AF, 'script': 'Korean'},
            {'name': 'Armenian', 'start': 0x0530, 'end': 0x058F, 'script': 'Armenian'},
            {'name': 'Georgian', 'start': 0x10A0, 'end': 0x10FF, 'script': 'Georgian'},
            {'name': 'Ethiopic', 'start': 0x1200, 'end': 0x137F, 'script': 'Ethiopic'},
            {'name': 'Cherokee', 'start': 0x13A0, 'end': 0x13FF, 'script': 'Cherokee'},
            {'name': 'Canadian Aboriginal', 'start': 0x1400, 'end': 0x167F, 'script': 'Canadian Aboriginal'},
        ]
        
        coverage_results = []
        
        for block in unicode_blocks:
            total_chars = block['end'] - block['start'] + 1
            supported_chars = 0
            
            # Check coverage in this block
            for codepoint in range(block['start'], block['end'] + 1):
                if codepoint in self.cmap:
                    supported_chars += 1
            
            if supported_chars > 0:
                coverage = supported_chars / total_chars
                coverage_results.append({
                    'name': block['name'],
                    'script': block['script'],
                    'coverage': coverage,
                    'start': block['start'],
                    'end': block['end'],
                    'supported': supported_chars,
                    'total': total_chars
                })
        
        return coverage_results
    
    def get_language_support(self):
        """Analyze script-level language support"""
        unicode_coverage = self.get_unicode_coverage()
        
        # Script mapping to common language codes (ISO 639-1/3)
        script_languages = {
            'Latin': ['eng', 'fra', 'deu', 'spa', 'ita', 'por', 'nld', 'pol', 'ces', 'hun', 'tur'],
            'Cyrillic': ['rus', 'ukr', 'bul', 'srp', 'mkd', 'bel'],
            'Greek': ['ell'],
            'Arabic': ['ara', 'fas', 'urd', 'heb'],  # Hebrew included for compatibility
            'Hebrew': ['heb'],
            'Devanagari': ['hin', 'mar', 'nep'],
            'Bengali': ['ben', 'asm'],
            'Thai': ['tha'],
            'Japanese': ['jpn'],
            'CJK': ['zho', 'jpn', 'kor'],  # Chinese, Japanese, Korean
            'Korean': ['kor'],
            'Armenian': ['hye'],
            'Georgian': ['kat'],
            'Ethiopic': ['amh', 'tir'],
            'Cherokee': ['chr'],
            'Canadian Aboriginal': ['iku', 'cre']
        }
        
        # Group blocks by script and calculate script coverage
        script_coverage = {}
        for block in unicode_coverage:
            script = block['script']
            if script not in script_coverage:
                script_coverage[script] = {
                    'blocks': [],
                    'total_supported': 0,
                    'total_chars': 0
                }
            
            script_coverage[script]['blocks'].append(block['name'])
            script_coverage[script]['total_supported'] += block['supported']
            script_coverage[script]['total_chars'] += block['total']
        
        # Generate script summaries
        scripts = []
        total_languages = 0
        
        for script, data in script_coverage.items():
            coverage = data['total_supported'] / data['total_chars'] if data['total_chars'] > 0 else 0
            languages = script_languages.get(script, [])
            
            # Only include scripts with reasonable coverage (>10% for most, >5% for CJK due to size)
            min_coverage = 0.05 if script == 'CJK' else 0.1
            if coverage >= min_coverage:
                scripts.append({
                    'name': script,
                    'coverage': round(coverage, 3),
                    'languages': languages,
                    'blocks': data['blocks']
                })
                total_languages += len(languages)
        
        # Sort by coverage descending
        scripts.sort(key=lambda x: x['coverage'], reverse=True)
        
        return {
            'scripts': scripts,
            'total': total_languages
        }
    
    def get_variable_info(self):
        """Extract variable font information if available"""
        if 'fvar' not in self.font:
            return None
            
        fvar = self.font['fvar']
        axes = {}
        
        for axis in fvar.axes:
            axes[axis.axisTag] = {
                'min': axis.minValue,
                'max': axis.maxValue,
                'default': axis.defaultValue,
                'name': axis.axisNameID
            }
        
        # Get named instances
        instances = []
        if hasattr(fvar, 'instances'):
            for instance in fvar.instances:
                coords = {}
                for i, axis in enumerate(fvar.axes):
                    if i < len(instance.coordinates):
                        coords[axis.axisTag] = instance.coordinates[axis.axisTag]
                
                instances.append({
                    'name': self._get_name_by_id(instance.subfamilyNameID),
                    'coordinates': coords
                })
        
        return {
            'axes': axes,
            'instances': instances
        }
    
    def get_complete_analysis(self):
        """Get complete font analysis"""
        basic_info = self.get_basic_info()
        metrics = self.get_metrics()
        features = self.get_opentype_features()
        stylistic_sets = self.get_stylistic_sets()
        unicode_coverage = self.get_unicode_coverage()
        language_support = self.get_language_support()
        variable_info = self.get_variable_info()
        
        return {
            'basic': basic_info,
            'metrics': metrics,
            'features': {
                'openTypeFeatures': features,
                'stylisticSets': stylistic_sets,
                'unicodeRanges': unicode_coverage
            },
            'languages': language_support,
            'variable': variable_info,
            'file': {
                'path': str(self.font_path),
                'size': self.font_path.stat().st_size,
                'format': self.font_path.suffix.lower().lstrip('.')
            }
        }
    
    def _get_name_record(self, name_table, name_id):
        """Get name record by ID, preferring English"""
        try:
            # Try English first
            for record in name_table.names:
                if record.nameID == name_id and record.langID == 0x409:  # English
                    return str(record)
            
            # Fallback to first available
            for record in name_table.names:
                if record.nameID == name_id:
                    return str(record)
        except:
            pass
        return None
    
    def _get_name_by_id(self, name_id):
        """Get name by nameID"""
        if 'name' not in self.font:
            return None
        return self._get_name_record(self.font['name'], name_id)
    
    def _normalize_style(self, subfamily_name):
        """Convert subfamily to CSS font-style"""
        if not subfamily_name:
            return 'normal'
        
        lower = subfamily_name.lower()
        if 'italic' in lower or 'oblique' in lower:
            return 'italic'
        return 'normal'
    
    def _extract_stretch(self, family_name, subfamily_name):
        """Extract font-stretch value"""
        text = f"{family_name or ''} {subfamily_name or ''}".lower()
        
        if 'ultra-condensed' in text or 'ultracondensed' in text:
            return 'ultra-condensed'
        if 'extra-condensed' in text or 'extracondensed' in text:
            return 'extra-condensed'
        if 'condensed' in text:
            return 'condensed'
        if 'semi-condensed' in text or 'semicondensed' in text or 'narrow' in text:
            return 'semi-condensed'
        if 'semi-expanded' in text or 'semiexpanded' in text:
            return 'semi-expanded'
        if 'extra-expanded' in text or 'extraexpanded' in text:
            return 'extra-expanded'
        if 'ultra-expanded' in text or 'ultraexpanded' in text or 'wide' in text:
            return 'ultra-expanded'
        if 'expanded' in text or 'extended' in text:
            return 'expanded'
        
        return 'normal'


def main():
    """CLI interface"""
    if len(sys.argv) != 2:
        print("Usage: python font-inspector.py <font-file>", file=sys.stderr)
        sys.exit(1)
    
    font_path = sys.argv[1]
    if not os.path.exists(font_path):
        print(f"Error: Font file '{font_path}' not found", file=sys.stderr)
        sys.exit(1)
    
    try:
        inspector = FontInspector(font_path)
        analysis = inspector.get_complete_analysis()
        print(json.dumps(analysis, indent=2, ensure_ascii=False))
    except Exception as e:
        print(f"Error analyzing font: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()