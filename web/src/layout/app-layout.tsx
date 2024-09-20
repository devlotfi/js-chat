import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="flex">
      <h1>chat</h1>
      <Outlet></Outlet>
    </div>
  );
}
