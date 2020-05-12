import React, {
  useState,
  useContext,
  useEffect
} from 'react';
import PageTitle from '../components/common/PageTitle';
import DashboardMetric from './../components/DashboardMetric';
import Card from '../components/common/Card';
import {
  faChartArea,
  faDollarSign,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { FetchContext } from '../context/FetchContext';
import { formatCurrency } from './../util';
import DashboardChart from './../components/DashboardChart';

const Dashboard = () => {
  const fetchContext = useContext(FetchContext);
  const [dashboardData, setDashboardData] = useState();

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const { data } = await fetchContext.authAxios.get(
          'dashboard-data'
        );
        setDashboardData(data);
      } catch (err) {
        console.log(err);
      }
    };

    getDashboardData();
  }, [fetchContext]);

  return (
    <>
      <PageTitle title="Dashboard" />
      {dashboardData ? (
        <>
          <div className="mb-4 flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/3 sm:mr-2 mb-4 sm:mb-0">
              <DashboardMetric
                title="Sales Volume"
                value={formatCurrency(
                  dashboardData.salesVolume
                )}
                icon={faChartArea}
              />
            </div>
            <div className="w-full sm:w-1/3 sm:ml-2 sm:mr-2 mb-4 sm:mb-0">
              <DashboardMetric
                title="New Customers"
                value={dashboardData.newCustomers}
                icon={faUserPlus}
              />
            </div>
            <div className="w-full sm:w-1/3 sm:ml-2 mb-4 sm:mb-0">
              <DashboardMetric
                title="Refunds"
                value={formatCurrency(
                  dashboardData.refunds
                )}
                icon={faDollarSign}
              />
            </div>
          </div>
          <div className="w-full mt-4">
            <Card>
              {dashboardData && (
                <DashboardChart
                  salesData={dashboardData.graphData}
                />
              )}
            </Card>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Dashboard;
