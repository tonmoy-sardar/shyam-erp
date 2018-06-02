import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialService } from '../../core/services/material.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpService } from '../../core/services/help.service';
import * as Globals from '../../core/globals';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  materialList = [];
  defaultPagination: number;
  totalMaterialList: number;
  search_key = '';
  sort_by = '';
  sort_type= '';
  itemNo: number;
  help_heading = "";
  help_description = "";
  lower_count: number;
  upper_count: number;
  paginationMaxSize: number;
  itemPerPage: number;

  headerThOption = [];
  constructor(
    private materialService: MaterialService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private helpService: HelpService
  ) { }

  ngOnInit() {

    this.headerThOption = [
      {  
        name: "Type",
        code: "material_type__material_type",
        sort_type:''
      },
      {  
        name: "Name",
        code: "material_fullname",
        sort_type:''
      }
    ];

    this.spinner.show();
    this.defaultPagination = 1;
    this.paginationMaxSize = Globals.paginationMaxSize;
    this.itemPerPage = Globals.itemPerPage;
    this.getMaterialList();
    this.getHelp();
  }

  getHelp() {
    this.helpService.getHelp().subscribe(res => {
      this.help_heading = res.data.material.heading;
      this.help_description = res.data.material.desc;
    })
  }

  dataSearch() {
    this.spinner.show();
    this.defaultPagination = 1;
    this.getMaterialList();
  }

  getMaterialList() {
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', this.defaultPagination.toString());
    if(this.search_key !='')
    {
      params.set('search', this.search_key.toString());
    }
    if(this.sort_by !='')
    {
      params.set('field_name', this.sort_by.toString());
    }

    if(this.sort_type !='')
    {
      params.set('order_by', this.sort_type.toString());
    }
    this.materialService.getMaterialList(params).subscribe(
      (data: any[]) => {
        this.totalMaterialList = data['count'];
        this.materialList = data['results'];
        this.itemNo = (this.defaultPagination - 1) * this.itemPerPage;
        this.lower_count = this.itemNo + 1;
        if (this.totalMaterialList > this.itemPerPage * this.defaultPagination) {
          this.upper_count = this.itemPerPage * this.defaultPagination
        }
        else {
          this.upper_count = this.totalMaterialList
        }
        this.spinner.hide();
      }
    );
  };

  deleteMaterial(id) {
    this.spinner.show();
    let material;

    material = {
      id: id
    };

    this.materialService.deleteMaterial(material).subscribe(
      response => {
        this.toastr.success('Material deleted successfully', '', {
          timeOut: 3000,
        });
        this.getMaterialList();
      },
      error => {
        console.log('error', error)
        // this.toastr.error('everything is broken', '', {
        //   timeOut: 3000,
        // });
      }
    );
  };

  btnClickNav(toNav) {
    this.router.navigateByUrl('/' + toNav);
  };

  pagination() {
    this.spinner.show();
    this.getMaterialList();
  };

  sortTable(value)
  {
    let type = '';
    this.headerThOption.forEach(function (optionValue) {
      if(optionValue.code == value)
      {
        if(optionValue.sort_type =='desc')
        {
          type = 'asc';
        }
        else
        {
          type = 'desc';
        }
        optionValue.sort_type = type;
      }
      else{
        optionValue.sort_type = '';
      }
    });

    this.sort_by = value;
    this.sort_type = type;
    this.spinner.show();
    this.defaultPagination = 1;
    this.getMaterialList();
  };
}
