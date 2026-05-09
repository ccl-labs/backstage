import React from 'react';
import { useEntity } from '@backstage/plugin-catalog-react';
import { InfoCard, EmptyState } from '@backstage/core-components';
import { Entity } from '@backstage/catalog-model';

const ANNOTATION = 'grafana/dashboard-url';

export const isGrafanaDashboardAvailable = (entity: Entity) =>
  Boolean(entity.metadata.annotations?.[ANNOTATION]);

export const GrafanaDashboardCard = () => {
  const { entity } = useEntity();
  const dashboardUrl = entity.metadata.annotations?.[ANNOTATION];

  if (!dashboardUrl) {
    return (
      <EmptyState
        title="Grafana dashboard not configured"
        missing="info"
        description={`Add the "${ANNOTATION}" annotation to enable this tab.`}
      />
    );
  }

  return (
    <InfoCard title="Grafana Dashboard" noPadding>
      <iframe
        src={`${dashboardUrl}?kiosk=tv&orgId=1`}
        width="100%"
        height="800"
        style={{ border: 'none', display: 'block' }}
        title="Grafana Dashboard"
      />
    </InfoCard>
  );
};
