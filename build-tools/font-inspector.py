#!/usr/bin/env python3
"""
Font Inspector - fontTools-based font analysis for multi-language support

Replacement for FontKit with comprehensive Unicode support for all major written languages.
Provides font metadata extraction, OpenType feature analysis, and character coverage.
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
        
        # Define Unicode blocks for major writing systems
        unicode_blocks = [
            {'name': 'Basic Latin', 'start': 0x0000, 'end': 0x007F},
            {'name': 'Latin-1 Supplement', 'start': 0x0080, 'end': 0x00FF},
            {'name': 'Latin Extended-A', 'start': 0x0100, 'end': 0x017F},
            {'name': 'Latin Extended-B', 'start': 0x0180, 'end': 0x024F},
            {'name': 'Latin Extended Additional', 'start': 0x1E00, 'end': 0x1EFF},
            {'name': 'Cyrillic', 'start': 0x0400, 'end': 0x04FF},
            {'name': 'Cyrillic Supplement', 'start': 0x0500, 'end': 0x052F},
            {'name': 'Greek and Coptic', 'start': 0x0370, 'end': 0x03FF},
            {'name': 'Arabic', 'start': 0x0600, 'end': 0x06FF},
            {'name': 'Arabic Supplement', 'start': 0x0750, 'end': 0x077F},
            {'name': 'Hebrew', 'start': 0x0590, 'end': 0x05FF},
            {'name': 'Devanagari', 'start': 0x0900, 'end': 0x097F},
            {'name': 'Bengali', 'start': 0x0980, 'end': 0x09FF},
            {'name': 'Thai', 'start': 0x0E00, 'end': 0x0E7F},
            {'name': 'Hiragana', 'start': 0x3040, 'end': 0x309F},
            {'name': 'Katakana', 'start': 0x30A0, 'end': 0x30FF},
            {'name': 'CJK Unified Ideographs', 'start': 0x4E00, 'end': 0x9FFF},
            {'name': 'Hangul Syllables', 'start': 0xAC00, 'end': 0xD7AF},
            {'name': 'Armenian', 'start': 0x0530, 'end': 0x058F},
            {'name': 'Georgian', 'start': 0x10A0, 'end': 0x10FF},
            {'name': 'Ethiopic', 'start': 0x1200, 'end': 0x137F},
            {'name': 'Cherokee', 'start': 0x13A0, 'end': 0x13FF},
            {'name': 'Canadian Aboriginal', 'start': 0x1400, 'end': 0x167F},
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
                    'coverage': coverage,
                    'start': block['start'],
                    'end': block['end'],
                    'supported': supported_chars,
                    'total': total_chars
                })
        
        return coverage_results
    
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
        variable_info = self.get_variable_info()
        
        return {
            'basic': basic_info,
            'metrics': metrics,
            'features': {
                'openTypeFeatures': features,
                'stylisticSets': stylistic_sets,
                'unicodeRanges': unicode_coverage
            },
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