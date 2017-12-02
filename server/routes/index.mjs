import main from './main';
import users from './users';

export const mountRoutes = app => {
  // add new use statement for each route
  app.use('/', main);
  app.use('/users', users);
  console.log(`routes mounted`);
};
