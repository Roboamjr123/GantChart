import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GanttSampleSync from "./page/ganttSync/GanttSampleSync";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  // return (
  //   <Router>
  //     <Routes>
  //       {/* <Route path="/" element={<Layout />}>
  //         <Route index element={<Dashoard />}></Route>
  //         <Route path="products" element={<Products />}></Route>
  //       </Route>
  //       <Route path="login" element={<div>this is login page</div>}></Route> */}
  //       <QueryClientProvider client={queryClient}>
  //         <GanttSampleSync />
  //       </QueryClientProvider>
  //     </Routes>
  //   </Router>
  // );

  return (
    // Wrap the entire Router and Routes in the QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="" element={<GanttSampleSync />} />
          {/* <Route path="/another" element={<AnotherComponent />} /> */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
