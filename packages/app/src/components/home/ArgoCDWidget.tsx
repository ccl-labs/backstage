import { useEffect, useState } from 'react';
import { useApi, fetchApiRef } from '@backstage/core-plugin-api';
import { InfoCard, Progress, ResponseErrorPanel } from '@backstage/core-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

type AppStatus = {
  name: string;
  namespace: string;
  syncStatus: string;
  healthStatus: string;
};

const statusColor = (status: string): 'default' | 'primary' | 'secondary' =>
  status === 'Synced' || status === 'Healthy' ? 'primary' : 'secondary';

export const ArgoCDWidget = () => {
  const fetchApi = useApi(fetchApiRef);
  const [apps, setApps] = useState<AppStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    fetchApi
      .fetch('/api/proxy/argocd/api/v1/applications')
      .then(res => res.json())
      .then(data => {
        const unhealthy: AppStatus[] = (data.items ?? [])
          .filter(
            (app: any) =>
              app.status?.sync?.status !== 'Synced' ||
              app.status?.health?.status !== 'Healthy',
          )
          .map((app: any) => ({
            name: app.metadata.name,
            namespace: app.spec?.destination?.namespace ?? '-',
            syncStatus: app.status?.sync?.status ?? 'Unknown',
            healthStatus: app.status?.health?.status ?? 'Unknown',
          }));
        setApps(unhealthy);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [fetchApi]);

  if (loading) return <InfoCard title="ArgoCD 異常検知"><Progress /></InfoCard>;
  if (error) return <InfoCard title="ArgoCD 異常検知"><ResponseErrorPanel error={error} /></InfoCard>;

  return (
    <InfoCard
      title="ArgoCD 異常検知"
      subheader={
        apps.length === 0
          ? '異常なし'
          : `${apps.length} 件のアプリに問題があります`
      }
      deepLink={{
        title: 'ArgoCD を開く',
        link: 'https://argocd.platform.local',
      }}
    >
      {apps.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          すべてのアプリが Synced / Healthy です
        </Typography>
      ) : (
        <Table size="small">
          <TableBody>
            {apps.map(app => (
              <TableRow key={app.name}>
                <TableCell>
                  <Link
                    href={`https://argocd.platform.local/applications/${app.name}`}
                    target="_blank"
                    rel="noopener"
                  >
                    {app.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Chip
                    label={app.syncStatus}
                    size="small"
                    color={statusColor(app.syncStatus)}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={app.healthStatus}
                    size="small"
                    color={statusColor(app.healthStatus)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </InfoCard>
  );
};
