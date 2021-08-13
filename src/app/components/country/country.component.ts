import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Country} from "../../models/country";
import {CountryService} from "../../services/country.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from "@angular/material/table";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})

export class CountryComponent implements OnInit {

  //toastr alert starts
  successAlert(message:string){
    this.toastr.success(message);
  }
  errorAlert(message:string){
    this.toastr.error(message);
  }
  //toastr alert ends

  // loading all countries in a table
  getAllCountries(): void {
    this.cs.getAllCountries()
      .subscribe(
        data => {
          this.dataSource = data; //assigning the response to table data
          console.log(this.dataSource);
        },
        error => {
          console.log(error);
        }
      );
  }

  //column data for data table
  displayedColumns: string[] = ['Country Code', 'Country Name', 'Continent', 'Population', "Covid Cases","Actions"];

  //initial data for data table (null)
  dataSource=new MatTableDataSource<Country>([]);

  //getting data from html form
  countryForm: FormGroup = new FormGroup({
     id: new FormControl(0),
     countryCode: new FormControl('',[Validators.required]),
     countryName:  new FormControl('',[Validators.required]),
     continent:  new FormControl('',[Validators.required]),
     population:  new FormControl('',[Validators.required]),
     covidPositives:  new FormControl('',[Validators.required]),
   });

  //data to be passed to backend
  dataToInsert:Country = new Country(0,"","","",0,0);

  constructor(
    private cs:CountryService, public toastr:ToastrService
  ) { }

  ngOnInit(): void {

    //calling this to initially populate all available data in the table
    this.getAllCountries();
  }


  //populating form fields with table data to edit
  edit(country:Country):void{
    this.countryForm.patchValue({
      id:country.id,
      countryCode:country.countryCode,
      countryName:country.countryName,
      continent:country.continent,
      population:country.population,
      covidPositives:country.covidPositives,
    })
  }

  //assigning data to object to send to back end
  getDataToInsert(){
    this.dataToInsert.id= this.countryForm.controls.id.value;
    this.dataToInsert.countryCode= this.countryForm.controls.countryCode.value;
    this.dataToInsert.countryName= this.countryForm.controls.countryName.value;
    this.dataToInsert.continent= this.countryForm.controls.continent.value;
    this.dataToInsert.population= this.countryForm.controls.population.value;
    this.dataToInsert.covidPositives= this.countryForm.controls.covidPositives.value;

    // insert/update country
    this.cs.saveCountry(this.dataToInsert)
      .subscribe(
        data => {
          this.successAlert("Save Successful"); //success alert
          console.log("save success");
          this.getAllCountries(); //refreshing table
          this.countryForm.patchValue({id:0}); //assigning id to 0 so insertion won't be collapsed
          this.resetForm(); //resetting form
          //this.countryForm.markAsPristine();
          //this.countryForm.markAsUntouched();
        },
        error => {
          this.errorAlert("Save Failed");
          console.log(error);
        }
      );
 }

  onFormSubmit():void {
    this.getDataToInsert(); //form submission
  }

  //making the reset button in the html to be clicked after insert/update of a country
  resetForm():void {
    const element = window.document.getElementById("formReset");

    if (element !== null) {
      element.click();
    }
  }


  //deleting a country with id
  delete(id:number):void{
    //getting confirmation before deleting
    let result = confirm("Are You Sure?");
    if(result) {
      this.cs.deleteCountry(id)
        .subscribe(
          data => {
            this.successAlert("Delete Successful");
            console.log("delete success");
            this.getAllCountries(); //refreshing table
          },
          error => {
            this.errorAlert("Delete Failed");
            console.log(error);
          }
        );
    }
  }
}
