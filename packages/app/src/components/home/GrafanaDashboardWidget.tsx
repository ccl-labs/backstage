import { InfoCard } from '@backstage/core-components';

export const GrafanaDashboardWidget = () => (
  <InfoCard title="Platform Quick View" noPadding>
    <iframe
      src="https://grafana.platform.local/d/adpwz7r/platform-quick-view?kiosk=tv&orgId=1"
      width="100%"
      height="700"
      style={{ border: 'none', display: 'block' }}
      title="Platform Quick View"
    />
  </InfoCard>
);
