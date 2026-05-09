import { Content, Page } from '@backstage/core-components';
import { HomePageToolkit } from '@backstage/plugin-home';
import Grid from '@material-ui/core/Grid';
import { GrafanaDashboardWidget } from './GrafanaDashboardWidget';

const tools = [
  { label: 'ArgoCD', url: 'https://argocd.platform.local', icon: <span>🔄</span> },
  { label: 'Keycloak', url: 'https://keycloak.platform.local', icon: <span>🔑</span> },
  { label: 'Grafana', url: 'https://grafana.platform.local', icon: <span>📊</span> },
  { label: 'Prometheus', url: 'https://prometheus.platform.local', icon: <span>🔥</span> },
  { label: 'Loki', url: 'https://loki.platform.local', icon: <span>📜</span> },
  { label: 'MinIO', url: 'https://minio.platform.local', icon: <span>🗄️</span> },
];

export const HomePage = () => (
  <Page themeId="home">
    <Content>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <HomePageToolkit tools={tools} />
        </Grid>
        <Grid item xs={12}>
          <GrafanaDashboardWidget />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
