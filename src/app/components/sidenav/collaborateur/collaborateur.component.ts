import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-collaborateur',
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.scss'],
})
export class CollaborateurComponent {
  chart: any;

  title = 'ng2-charts-demo';

  // Doughnut
  doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];

  doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [350, 450, 100], label: 'Series A' },
    { data: [50, 150, 120], label: 'Series B' },
    { data: [250, 130, 70], label: 'Series C' },
  ];

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };
}
