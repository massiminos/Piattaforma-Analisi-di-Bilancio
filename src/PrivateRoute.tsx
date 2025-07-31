import { ReactNode } from 'react';
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth}  from "./Analisi_di_bilancio/DataLoaderFirestore.tsx";
                                                             //JSX.Element
export default function PrivateRoute({ children }: { children: ReactNode  }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Caricamento...</p>;
  if (!user) return <Navigate to="/" />;

  return children;
}