import { SectionCards } from "./section-cards";
import { ChartAreaInteractive } from "./chart-area-interactive";
import data from "./data.json";
import { DataTable } from "./data-table";
function Dashboard() {
  return (
    <>
      <div className="@container/main  flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4  md:gap-6 ">
          <SectionCards />
          <div>
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
