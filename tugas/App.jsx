import { Routes, Route } from 'react-router';

import React from 'react';

function App() {
  return (
    <Routes>
      <Route path="/app/v1">
        <Route index element={<Home />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="new" element={<Register />} />
          <Route path="forgot" element={<ForgotPwd />} />
        </Route>
        <Route path="user" element={<UserLayout />}>
          <Route index element={<Profile />} />
          <Route path="order" element={<HistoryOrder />} />
        </Route>
        <Route path="products" element={<ProductsLayout />}>
          <Route index element={<ListProducts />} />
          <Route path=":id">
            <Route index element={<DetailProduct />} />
            <Route path="order" element={<OrderPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
