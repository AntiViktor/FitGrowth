import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfilePageModule),
      },
      {
        path: 'nutrition',
        loadChildren: () =>
          import('../nutrition/nutrition.module').then(
            (m) => m.NutritionPageModule
          ),
      },
      {
        path: 'exercise',
        loadChildren: () =>
          import('../exercise/exercise.module').then(
            (m) => m.ExercisePageModule
          ),
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
