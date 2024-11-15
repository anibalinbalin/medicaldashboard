import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo, FeatureClickProps } from './Logo';
import { Badge } from "@/components/ui/badge";

interface FacialFeatureSelectorProps {
  onFeatureSelect: (feature: string) => void;
  selectedFeature: string | null;
}

export const FacialFeatureSelector: React.FC<FacialFeatureSelectorProps> = ({
  onFeatureSelect,
  selectedFeature
}) => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handleFeatureClick = (feature: string) => () => {
    setSelectedFeatures(prev => {
      // If feature already exists, don't add it again
      if (prev.includes(feature)) {
        return prev;
      }
      return [...prev, feature];
    });
    onFeatureSelect(feature);
  };

  const handleRemoveFeature = (featureToRemove: string) => {
    setSelectedFeatures(prev => prev.filter(feature => feature !== featureToRemove));
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Seleccionar Área Afectada</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <Logo 
          className="w-[520px] h-[520px]"
          onNoseClick={handleFeatureClick('nariz')}
          onLeftEyeClick={handleFeatureClick('ojo izquierdo')}
          onRightEyeClick={handleFeatureClick('ojo derecho')}
          onChinClick={handleFeatureClick('mentón')}
          onLeftCheekClick={handleFeatureClick('mejilla izquierda')}
          onRightCheekClick={handleFeatureClick('mejilla derecha')}
          onForeheadClick={handleFeatureClick('frente')}
          onNeckClick={handleFeatureClick('cuello')}
          onNeckZoneClick={handleFeatureClick('zona del cuello')}
        />
        {selectedFeatures.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedFeatures.map((feature) => (
              <Badge 
                key={feature}
                variant="secondary"
                className="text-sm px-3 py-1 cursor-pointer"
                onClick={() => handleRemoveFeature(feature)}
              >
                {feature} ×
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 