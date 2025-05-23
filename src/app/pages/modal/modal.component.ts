import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Livro } from '../../models/interfaces';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, A11yModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() livro!: Livro;
  statusModal: boolean = true;
  @Output() mudouModal = new EventEmitter<boolean>()

  constructor(
    //O Renderer2 no Angular desempenha um papel crucial ao facilitar a manipulação segura do DOM
    private renderer: Renderer2,
    private element: ElementRef,
  ) {}

  //Esta alternativa ilustra o emprego do @HostListener no Angular, um decorator essencial para ouvir eventos no elemento hospedeiro (host) de um componente ou diretiva. Seu uso permite uma abordagem limpa e Angular-friendly para lidar com eventos, integrando-se perfeitamente ao ciclo de vida do componente.
  @HostListener('document:keydown.escape') fecharModalAoPressionarAsc() {
    if(this.statusModal) {
      this.fecharModal();
    }
  }

  fecharModal() {
    this.statusModal = false;
    this.mudouModal.emit(this.statusModal);
    //inserindo barra de rolagem no body quando o modal fechar
    this.renderer.setStyle(this.element.nativeElement.ownerDocument.body, 'overflow', 'scroll');
  }

  lerPrevia() {
    window.open(this.livro.previewLink, '_blank');
  }

  get thumbnailUrl() {
    return this.livro.thumbnail || 'assets/imagens/capa-indisponivel.png';
  }
}
