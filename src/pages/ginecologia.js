import React from 'react';
import BasicLayout from '../layouts/BasicLayout';
import SliderGinecologia from '../components/SliderGinecologia';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function Ginecologia() {
  const state = useSelector((state) => state.login.user);
  if (state.sex !== 'F') return <Redirect to="/dashboard/info-basic" />;
  return (
    <div>
      <BasicLayout>
        <SliderGinecologia />
      </BasicLayout>
    </div>
  );
}
