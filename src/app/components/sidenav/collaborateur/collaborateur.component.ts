import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ColaboratteurService } from 'src/app/services/colaboratteur.service';

@Component({
  selector: 'app-collaborateur',
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.scss'],
})
export class CollaborateurComponent implements OnInit {
  constructor(private colaboratteurService: ColaboratteurService) {}

  ngOnInit(): void {
    this.colaboratteurService.getData().subscribe((data: any) => {
      console.log(data);
      this.collaborateurs = data.data;
      this.loadChartData();
    });
  }
  chartLoaded = false;
  collaborateurs: any;
  chart: any;
  title = 'ng2-charts-demo';

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

  getAllNomPrenom() {
    let res = [];
    for (let colab of this.collaborateurs) {
      res.push({ Nom: colab.Nom, Prenom: colab.Prenom });
    }
    console.log(res);
    return res;
  }
}
