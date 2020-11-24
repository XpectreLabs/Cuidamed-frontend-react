import React from 'react';
import BasicLayout from '../layouts/BasicLayout';
import ListaE from '../components/ListaEnfermedades';
import { Redirect } from 'react-router-dom';
export default function ListaEnfermedades() {
  if (!window.history.state) return <Redirect to="/dashboard/sistemas" />;
  return (
    <div>
      <BasicLayout>
        <ListaE />
      </BasicLayout>
    </div>
  );
}
