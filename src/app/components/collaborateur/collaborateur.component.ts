import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { DirectusService } from 'src/app/services/directus.service';

@Component({
  selector: 'app-collaborateur',
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.scss'],
})
export class CollaborateurComponent implements OnInit {
  constructor(private directusService: DirectusService) {}

  ngOnInit(): void {
    this.directusService.getCollaborateurs().subscribe((data: any) => {
      this.collaborateurs = data.data;
      this.loadChartData();
    });
  }
  chartLoaded = false;
  collaborateurs: any;
  chart: any;
  columnsNames = ['Nom', 'Prenom', 'Metier'];

  // Doughnut
  doughnutChartLabels: string[];
  // = [
  //   'Ingénieur devops',
  //   'Tech lead',
  //   'Admin sys/infra',
  // ];

  doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'];
  //  = [
  //   { data: [5, 10, 2], label: 'Nb personnes' },
  // ];

  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Nombre de collaborateurs actifs en fonction de leur métier',
      },
    },
  };

  loadChartData() {
    let uniqueMetiers: string[] = [
      ...new Set<string>(
        this.collaborateurs.map((item: any) => item.Metier.Nom)
      ),
    ];
    this.doughnutChartLabels = uniqueMetiers;

    let countMetiers = this.countMetierAndNotParti(uniqueMetiers);
    this.doughnutChartDatasets = [
      { data: countMetiers, label: 'Nb personnes' },
    ];

    this.chartLoaded = true;
  }
  /* This function cont the number of colab by metier and verify that the colab is not exit */
  countMetierAndNotParti(listeNomMetier: any) {
    let res = [];
    for (let metier of listeNomMetier) {
      let count = 0;
      for (let colab of this.collaborateurs) {
        if (colab.Metier.Nom === metier && !colab.Parti) {
          count = count + 1;
        }
      }
      res.push(count);
    }
    return res;
  }
}
