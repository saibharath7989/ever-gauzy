import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionsEnum } from '@gauzy/contracts';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { OrganizationsComponent } from './organizations.component';
import { EditOrganizationComponent, EditOrganizationResolver } from './edit-organization';
import { EditOrganizationLocationComponent } from './edit-organization/edit-organization-settings/edit-organization-location/edit-organization-location.component';
import { EditOrganizationOtherSettingsComponent } from './edit-organization/edit-organization-settings/edit-organization-other-settings/edit-organization-other-settings.component';
import { EditOrganizationMainComponent } from './edit-organization/edit-organization-settings/edit-organization-main/edit-organization-main.component';

export function redirectTo() {
	return '/pages/dashboard';
}

const routes: Routes = [
	{
		path: '',
		component: OrganizationsComponent,
		canActivate: [NgxPermissionsGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.ALL_ORG_VIEW],
				redirectTo
			},
			selectors: {
				project: false,
				employee: false,
				organization: false,
				date: false
			}
		}
	},
	{
		path: 'edit/:id',
		component: EditOrganizationComponent,
		canActivate: [NgxPermissionsGuard],
		data: {
			permissions: {
				only: [PermissionsEnum.ALL_ORG_EDIT],
				redirectTo
			},
			selectors: {
				project: false,
				employee: false,
				date: false
			}
		},
		resolve: {
			organization: EditOrganizationResolver
		},
		children: [
			{
				path: '',
				redirectTo: 'main',
				pathMatch: 'full'
			},
			{
				path: 'main',
				component: EditOrganizationMainComponent,
				data: {
					selectors: {
						project: false,
						employee: false,
						date: false
					}
				}
			},
			{
				path: 'location',
				component: EditOrganizationLocationComponent,
				data: {
					selectors: {
						project: false,
						employee: false,
						date: false
					}
				}
			},
			{
				path: 'settings',
				component: EditOrganizationOtherSettingsComponent,
				data: {
					selectors: {
						project: false,
						employee: false,
						date: false
					}
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class OrganizationsRoutingModule {}
