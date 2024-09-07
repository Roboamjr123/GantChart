import BuyerProfileChart from "./BuyerProfileChart";
import DashboardStatsGrid from "./DashboardStatsGrid";
import PopularProducts from "./PopularProducts";
import RecentOrders from "./RecentOrders";
import TransactionChart from "./TransactionChart";

function Dashoard() {
  return (
    <div className="flex flex-col gap-4">
      <DashboardStatsGrid />
      <div className="flex flex-row gap-4 w-full">
        <TransactionChart />
        <BuyerProfileChart />
      </div>
      <div className="flex flex-row gap-4 w-full">
        <RecentOrders />
        <PopularProducts />
      </div>
    </div>
  );
}

export default Dashoard;
