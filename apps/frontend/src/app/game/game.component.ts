import { Component, computed, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterComponent } from '../character/character.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CharacterUI } from '../models/character';
import { ApiService } from '../services/api.service';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [DropdownComponent, CharacterComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  dropdownState = signal<{x: number, y: number, visible: boolean}>({x: 0, y: 0, visible: false});
  sceneUrl: string = '';

  private xNormalized: number = 0;
  private yNormalized: number = 0;

  readonly characters = toSignal(
    this.api.getCharacters(), 
    { initialValue: []}
  );

  foundIds = signal<number[]>([]);

  displayCharacters = computed<CharacterUI[]>(() => {
    const allCharacters = this.characters();
    return allCharacters.map(character => ({
      ...character,
      found: this.foundIds().includes(character.id)
    }));
  });

  constructor(
    private api: ApiService,
    public timer: TimerService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const scene = this.activatedRoute.snapshot.queryParamMap.get('scene');
    this.sceneUrl = '/assets/images/scenes/' + scene + '.jpeg';
    this.timer.startTimer();
    this.api.startGame().subscribe();
  }

  onClick(event: MouseEvent) {
     const target = event.target as HTMLElement;
     if (!target) return;

     const rect = target.getBoundingClientRect();
     const posX = event.clientX - rect.left;
     const posY = event.clientY - rect.top;

     this.xNormalized = posX / rect.width;
     this.yNormalized = posY / rect.height; 
     
     this.dropdownState.set({x: event.clientX, y: event.clientY, visible: !this.dropdownState().visible});
  }

  onSelectValue(characterId: number) {
    this.dropdownState.update(val => ({...val, visible: !val.visible}));
    this.api.validate({
      positionX: this.xNormalized,
      positionY: this.yNormalized,
      imgUrl: this.sceneUrl,
      characterId
    }).subscribe({
      next: (result) => {
          if (result) {
            this.foundIds.update(currentIds => [...currentIds, characterId]);
            const allFound = this.foundIds().length === this.characters().length;
            if (allFound) {
              this.timer.stopTimer();
              this.api.endGame("John").subscribe();
            }
          }         
      },
      error: () => this.router.navigate([''])
    })
  }

  getValue = (character: CharacterUI ) => character.id;
  getLabel = (character: CharacterUI) => character.name;
  shouldDisplay = (character: CharacterUI) => !character.found;
  getImgUrl = (character: CharacterUI) => character.imgUrl;
}
