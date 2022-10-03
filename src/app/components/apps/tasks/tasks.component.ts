import { isPlatformBrowser } from "@angular/common";
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Validators } from "ngx-editor";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"],
})
export class TasksComponent implements OnInit {
  /*   @ViewChild("addTask") AddTask: AddTaskComponent;
  @ViewChild("createTag") CreateTag: CreateTagComponent; */
  nombre: any;
  arregloNuevo = [];
  constructor(private fb: FormBuilder, private modalService: NgbModal) {
    let nameC = localStorage.getItem("user");
    this.nombre = nameC;
    let arreglo = localStorage.getItem("arregloNotas");
    if (!arreglo) {
      localStorage.setItem("arregloNotas", JSON.stringify(this.arregloNota));
      this.arregloNuevo = JSON.parse(localStorage.getItem("arregloNotas"));
      console.log(this.arregloNuevo, "ZXS");
    } else {
      this.arregloNuevo = JSON.parse(localStorage.getItem("arregloNotas"));
      console.log(this.arregloNuevo, "ZXS");
      console.log("ya se añadio");
    }
  }
  arregloNota = [];

  arregloValues = [
    {
      name: "Creados por mi",
    },
    {
      name: "Tareas para hoy",
    },
    {
      name: "Tareas para la semana",
    },
    {
      name: "Tareas para el mes",
    },
    {
      name: "Prioridad",
    },
    {
      name: "Secretas",
    },
  ];
  signinForm: FormGroup;

  ngOnInit() {
    this.signinForm = this.fb.group({
      title: ["", Validators.required],
      subtitle: ["", Validators.required],
      type: ["", Validators.required],
      description: ["", Validators.required],
    });
  }
  obtenerSImulador() {
    this.arregloNuevo = this.getSimulador();
  }

  getSimulador() {
    let todos = JSON.parse(localStorage.getItem("arregloNotas"));
    return todos;
  }

  eliminarNota(index) {
    this.arregloNuevo.splice(index, 1);
    localStorage.setItem("arregloNotas", JSON.stringify(this.arregloNuevo));
  }
  variable: String = "Creados por mi";
  cambiaValor(event) {
    console.log(event);

    this.variable = event;
    /*   this.arregloNuevo = JSON.parse(localStorage.getItem("arregloNotas")); */
    /*    this.arregloNuevo = this.arregloNuevo.filter((u) => u.type == event); */
    console.log(this.arregloNuevo, "XXarregloNuevo");
  }

  public closeResult: string;
  public modalOpen: boolean = false;
  openModal(modal) {
    this.modalService
      .open(modal, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
        },
        (reason) => {
          console.log(`Dismissed with: ${reason}`);
        }
      );
  }
  workback;
  submitLoginForm() {
    this.workback = true;
    let data = {
      title: this.signinForm.get("title").value,
      subtitle: this.signinForm.get("subtitle").value,
      type: this.signinForm.get("type").value,
      description: this.signinForm.get("description").value,
    };

    this.arregloNuevo.push(data);
    localStorage.setItem("arregloNotas", JSON.stringify(this.arregloNuevo));
    this.workback = false;
    this.modalService.dismissAll();
    this.obtenerSImulador();
  }

  updateTodo(oldText, newText) {
    let todos = JSON.parse(localStorage.getItem("arregloNotas"));

    for (let i = 0; i < todos.length; i++) {
      if (i == oldText) {
        todos[i] = newText;
      }
    }
    localStorage.setItem("arregloNotas", JSON.stringify(todos));
    this.modalService.dismissAll();
    this.obtenerSImulador();
  }
  oldText;
  text;
  editarSimulador() {
    /*     console.log(this.DatosSimuladorindex); */

    let newTodo = {
      title: this.simuladorDate.title,
      subtitle: this.simuladorDate.subtitle,
      type: this.simuladorDate.type,
      description: this.simuladorDate.description,
    };

    if (this.simuladorDate[this.DatosSimuladorindex] == this.oldText) {
      this.simuladorDate[this.DatosSimuladorindex] = this.text;
    }
    this.updateTodo(this.DatosSimuladorindex, newTodo);
  }

  confirmResut;
  DatosSimuladorindex;
  simuladorDate;
  confirm(index, row, content) {
    this.DatosSimuladorindex = index;
    this.simuladorDate = JSON.parse(JSON.stringify(row));
    console.log(index, this.simuladorDate);
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", centered: true })
      .result.then(
        (result) => {
          this.confirmResut = `Closed with: ${result}`;
        },
        (reason) => {
          this.confirmResut = `Dismissed with: ${reason}`;
        }
      );
  }
}
