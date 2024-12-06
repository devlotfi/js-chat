import { RouterProvider } from 'react-router-dom';
import useRouter from './hooks/use-router';

export default function App() {
  const { router } = useRouter();

  return (
    <main className="min-h-screen min-w-screen flex flex-col">
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}
