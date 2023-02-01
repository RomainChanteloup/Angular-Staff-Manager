import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DirectusService } from 'src/app/services/directus.service';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.scss'],
})
export class ProjetsComponent implements OnInit {
  constructor(private directusService: DirectusService) {}
  ngOnInit(): void {
    this.directusService.getPlanStaff().subscribe((data: any) => {
      this.planStaff = data.data;
      this.loadChartData();
    });

    this.directusService.getIterations().subscribe((data: any) => {
      console.log(data.data);
    });
  }
  planStaff: any;
  chartLoaded = false;

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'ETP par itération et projet',
      },
    },
  };
  barChartType: ChartType = 'bar';

  barChartData: ChartData<'bar'>;
  // = {
  //   labels: [
  //     // 'PI 1',
  //     // 'PI 1.2'
  //   ],
  //   datasets: [
  //     // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //     // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  //     // { data: [3, 5, 7, 9, 3, 2, 0], label: 'Series C' },
  //   ],
  // };

  loadChartData() {
    // sumETP = {
    //   PI: string,
    //   ProjetNom: string,
    //   ETP: number,
    // }
    //make some opperation to get all nescessary data
    let sumETP: any = [];
    for (let record of this.planStaff) {
      let projectAndPiAlreadyThere = sumETP.find(
        (el: any) =>
          el.PI === record.Iteration_debut.Label &&
          el.Projet === record.Projet.Nom
      );
      if (!projectAndPiAlreadyThere) {
        sumETP.push({
          PI: record.Iteration_debut.Label,
          Projet: record.Projet.Nom,
          ETP: parseInt(record.Charge),
        });
      } else {
        projectAndPiAlreadyThere.ETP += parseInt(record.Charge);
      }
    }

    // now loading data in te chart
    let distinctPI: any[] = [
      ...new Set(sumETP.map((item: { PI: any }) => item.PI)),
    ];
    let distinctProjects = [
      ...new Set(sumETP.map((item: { Projet: any }) => item.Projet)),
    ];

    let datasetList: any[] = [];
    for (let projet of distinctProjects) {
      let projetNom = projet;
      let listeETP: any[] = [];
      for (let it of distinctPI) {
        if (sumETP.find((el: any) => el.PI === it && el.Projet === projet)) {
          listeETP.push(it);
        } else {
          listeETP.push(0);
        }
      }
      datasetList.push({ data: listeETP, label: projetNom });
    }
    this.barChartData = { labels: distinctPI, datasets: datasetList };
    this.chartLoaded = true;
  }

  getIterationsFromStartEnd(start: string, end: string) {}
}
