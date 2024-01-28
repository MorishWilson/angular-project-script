const { execSync } = require('child_process');
const readlineSync = require('readline-sync');
const os = require('os');
const fs = require('fs');

const isWindows = os.platform() === 'win32';
const projectName = process.argv[2] || 'default-project';
const sudoCommand = isWindows ? '' : 'sudo';
let isAngularInstalled = true;

const utf8 = 'utf8';
const mkdir = 'mkdir';
const touch = 'touch';
const ng_generate_component = 'ng g c';
const ng_generate_service = 'ng g s';
const ng_generate_module = 'ng g m';

const projectData = {
    src: {
        app: {
            app_component_html: `<router-outlet></router-outlet>`,
            animations: {
                animations_service_ts: `import { trigger, style, transition, animate } from '@angular/animations';

                export const slideAndChangeHeight = trigger('slideAndChangeHeight', [
                    transition(':enter', [
                        style({
                            height: '0',
                            width: '0',
                            borderRadius: '100%',
                        }),
                        animate('1s',
                            style({
                                height: '24rem',
                                width: '24rem',
                                borderRadius: '10rem',
                            })),
                        animate('2s ease-out',
                            style({
                                height: '60vh',
                                width: '80vw',
                                borderRadius: '3rem',
                            })),
                    ])
                ]);
                
                export const fixedCurtain = trigger('fixedCurtain', [
                    transition(':enter', [
                        style({
                            height: '0rem',
                        }),
                        animate('0.7s ease-out', style({ height: '100%' }))
                    ]),
                    transition(':leave', [
                        style({
                            height: '100%',
                        }),
                        animate('0.7s ease-in', style({ height: '0rem' }))
                    ])
                ]);
                
                export const slideUp = trigger('slideUp', [
                    transition(':enter', [
                        style({
                            transform: 'translateY(100%)',
                            opacity: 0,
                        }),
                        animate('1s ease-out',
                            style({
                                transform: 'translateY(0)',
                                opacity: 1,
                            })),
                    ]),
                ]);
                `,
            },
            buttons: {
                generic_button: {
                    generic_button_html: `<button class="button" [routerLink]="navigationData.routerLink" (click)="scrollToTopService.onClick()">
                    <p class="p">{{navigationData.name}}</p>
                    <div class="underline"></div>
                    </button>`,
                    generic_button_ts: `import { Component, Input } from '@angular/core';
                    import { ScrollToTopService } from 'src/app/shared/buttons/scroll-to-top.service';
                    
                    @Component({
                        selector: 'app-generic-button',
                        templateUrl: './generic-button.component.html',
                        styleUrls: ['./generic-button.component.scss']
                    })
                    export class GenericButtonComponent {
                        @Input() navigationData!: any;
                    
                        constructor(
                            protected scrollToTopService: ScrollToTopService,
                        ) { }
                    }`,
                },
                generic_menu_button: {
                    generic_menu_button_html: `<button class="button" [cdkMenuTriggerFor]="menu">
                    <p class="p">{{navigationData.name}}</p>
                    <div class="underline"></div>
                    </button>
                    
                    <ng-template #menu>
                    <div class="cdkMenu" @fixedCurtain cdkMenu>
                        <ng-container *ngFor="let data of navigationData.menu">
                            <a class="cdkMenuItem button" *ngIf="navigationData.name === 'Products' && !data.disabled" [href]="data.routerLink"
                                target="_blank" (click)="scrollToTopService.onClick()" cdkMenuItem>
                                <p class="p">{{data.name}}</p>
                                <div [class.underline]="!data.disabled"></div>
                            </a>
                            <button class="cdkMenuItem button" *ngIf="navigationData.name === 'Services' && !data.disabled" [routerLink]="data.routerLink"
                                (click)="scrollToTopService.onClick()" [disabled]="data.disabled" cdkMenuItem>
                                <p class="p">{{data.name}}</p>
                                <div [class.underline]="!data.disabled"></div>
                            </button>
                        </ng-container>
                    </div>
                    </ng-template>`,
                    generic_menu_button_ts: `import { Component, Input } from '@angular/core';
                    import { fixedCurtain } from 'src/app/animations/animations.service';
                    import { ScrollToTopService } from 'src/app/shared/buttons/scroll-to-top.service';
                    
                    @Component({
                        selector: 'app-generic-menu-button',
                        templateUrl: './generic-menu-button.component.html',
                        styleUrls: ['./generic-menu-button.component.scss'],
                        animations: [fixedCurtain]
                    })
                    export class GenericMenuButtonComponent {
                        @Input() navigationData!: any;
                    
                        constructor(
                            protected scrollToTopService: ScrollToTopService,
                        ) { }
                    }`,
                },
            },
            data: {

            },
            modules: {
                material: {
                    material_module_ts: `import { NgModule } from '@angular/core';

                    // MATERIAL MODULES
                    import { MatAutocompleteModule } from '@angular/material/autocomplete';
                    import { MatBadgeModule } from '@angular/material/badge';
                    import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
                    import { MatButtonModule } from '@angular/material/button';
                    import { MatButtonToggleModule } from '@angular/material/button-toggle';
                    import { MatCardModule } from '@angular/material/card';
                    import { MatCheckboxModule } from '@angular/material/checkbox';
                    import { MatChipsModule } from '@angular/material/chips';
                    import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
                    import { MatDatepickerModule } from '@angular/material/datepicker';
                    import { MatDialogModule } from '@angular/material/dialog';
                    import { MatDividerModule } from '@angular/material/divider';
                    import { MatExpansionModule } from '@angular/material/expansion';
                    import { MatFormFieldModule } from '@angular/material/form-field';
                    import { MatGridListModule } from '@angular/material/grid-list';
                    import { MatIconModule } from '@angular/material/icon';
                    import { MatInputModule } from '@angular/material/input';
                    import { MatListModule } from '@angular/material/list';
                    import { MatMenuModule } from '@angular/material/menu';
                    import { MatPaginatorModule } from '@angular/material/paginator';
                    import { MatProgressBarModule } from '@angular/material/progress-bar';
                    import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
                    import { MatRadioModule } from '@angular/material/radio';
                    import { MatSelectModule } from '@angular/material/select';
                    import { MatSidenavModule } from '@angular/material/sidenav';
                    import { MatSlideToggleModule } from '@angular/material/slide-toggle';
                    import { MatSliderModule } from '@angular/material/slider';
                    import { MatSnackBarModule } from '@angular/material/snack-bar';
                    import { MatSortModule } from '@angular/material/sort';
                    import { MatStepperModule } from '@angular/material/stepper';
                    import { MatTableModule } from '@angular/material/table';
                    import { MatTabsModule } from '@angular/material/tabs';
                    import { MatToolbarModule } from '@angular/material/toolbar';
                    import { MatTooltipModule } from '@angular/material/tooltip';
                    import { MatTreeModule } from '@angular/material/tree';
                    
                    // CDK MODULES
                    import { A11yModule } from '@angular/cdk/a11y';
                    import { CdkAccordionModule } from '@angular/cdk/accordion';
                    import { ClipboardModule } from '@angular/cdk/clipboard';
                    import { DialogModule } from '@angular/cdk/dialog';
                    import { DragDropModule } from '@angular/cdk/drag-drop';
                    import { LayoutModule } from '@angular/cdk/layout';
                    import { CdkListboxModule } from '@angular/cdk/listbox';
                    import { CdkMenuModule } from '@angular/cdk/menu';
                    import { OverlayModule } from '@angular/cdk/overlay';
                    import { PlatformModule } from '@angular/cdk/platform';
                    import { PortalModule } from '@angular/cdk/portal';
                    import { ScrollingModule } from '@angular/cdk/scrolling';
                    import { CdkStepperModule } from '@angular/cdk/stepper';
                    import { CdkTableModule } from '@angular/cdk/table';
                    import { TextFieldModule } from '@angular/cdk/text-field';
                    import { CdkTreeModule } from '@angular/cdk/tree';
                    
                    const MatComponents = [
                    
                        // MATERIAL MODULES
                        MatAutocompleteModule,
                        MatBadgeModule,
                        MatBottomSheetModule,
                        MatButtonModule,
                        MatButtonToggleModule,
                        MatCardModule,
                        MatCheckboxModule,
                        MatChipsModule,
                        MatDatepickerModule,
                        MatDialogModule,
                        MatDividerModule,
                        MatExpansionModule,
                        MatFormFieldModule,
                        MatGridListModule,
                        MatIconModule,
                        MatInputModule,
                        MatListModule,
                        MatMenuModule,
                        MatPaginatorModule,
                        MatProgressBarModule,
                        MatProgressSpinnerModule,
                        MatRadioModule,
                        MatRippleModule,
                        MatSelectModule,
                        MatSidenavModule,
                        MatSlideToggleModule,
                        MatSliderModule,
                        MatSnackBarModule,
                        MatSortModule,
                        MatStepperModule,
                        MatTableModule,
                        MatTabsModule,
                        MatToolbarModule,
                        MatTooltipModule,
                        MatTreeModule,
                        MatNativeDateModule,
                    
                        // CDK MODULES
                        A11yModule,
                        CdkAccordionModule,
                        ClipboardModule,
                        DialogModule,
                        DragDropModule,
                        LayoutModule,
                        CdkListboxModule,
                        CdkMenuModule,
                        OverlayModule,
                        PlatformModule,
                        PortalModule,
                        ScrollingModule,
                        CdkStepperModule,
                        CdkTableModule,
                        TextFieldModule,
                        CdkTreeModule,
                        A11yModule,
                        LayoutModule,
                        CdkMenuModule,
                        ClipboardModule,
                    ]
                    @NgModule({
                        imports: [MatComponents],
                        exports: [MatComponents]
                    })
                    export class MaterialModule { }
                    `,
                },
            },
            navigations: {
                header: {
                    header_component_html: ``,
                    header_component_scss: ``,
                    header_component_ts: ``,
                },
                footer: {
                    footer_component_html: ``,
                    footer_component_scss: ``,
                    footer_component_ts: ``,
                },
            },
            pages: {
                page_not_found: {
                    page_not_found_html: `<div class="home">
                <mat-card class="mat-card">
                    <h1 class="h1">Oops! We can't find that page.</h1>
                </mat-card>
                    </div>`,
                    page_not_found_scss: `@import '../../../assets/styles/material-palettes.scss';

                .home {
                    min-height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                
                    .mat-card {
                        margin: 1rem;
                        min-width: 80vw;
                        min-height: 40vh;
                        padding: 1rem;
                        background-color: inherit;
                        backdrop-filter: blur(2px);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border-radius: 3rem;
                        border: 2px dashed #000000;
                        box-shadow: none;
                    }
                    }`,
                },
            },
            sections: {},
            shared: {
                apis: {
                    url_data_service_ts: `import { Injectable } from '@angular/core';

                    @Injectable({
                        providedIn: 'root'
                    })
                    export class UrlDataService {

                        constructor() {
                            this.getUrlDataService();
                        }

                        getUrlDataService(): string[] {
                            const url = window.location.href;

                            // Extract the parameters part of the URL
                            const parametersPart = url.replace('http://localhost:4200/', '');

                            // Split the parameters by '/'
                            const parameters = parametersPart.split('/');

                            // Remove empty elements (in case the URL ends with '/')
                            const filteredParameters = parameters.filter(param => param.trim() !== '');

                            return filteredParameters;
                        }
                    }`,
                },
                breakpoints: {
                    breakpoints_service_ts: `import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
                    import { Injectable } from '@angular/core';
                    import { Observable, map, shareReplay } from 'rxjs';
                    
                    @Injectable({
                        providedIn: 'root'
                    })
                    export class BreakpointsService {
                    
                        constructor(
                            private breakpointObserver: BreakpointObserver,
                        ) { }
                    
                        isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
                            .pipe(
                                map(result => result.matches),
                                shareReplay()
                            );
                    
                            getBreakpointsService(){
                                return this.isHandset$;
                            }
                    }`,
                },
                buttons: {
                    scroll_to_top_service_ts: `import { Injectable } from '@angular/core';

                    @Injectable({
                        providedIn: 'root'
                    })
                    export class ScrollToTopService {
                        onClick() {
                            return window.scrollTo(0, 0);
                        }
                    }`,
                },
            },
            snackbars: {
                positive_snackbar: {
                    positive_snackbar_component_html: `<div class="matSnackBarComponent" matSnackBarComponent>
                        <div class="custom-snackbar">
                            <span class="matSnackBarLabel" matSnackBarLabel>{{ data.message }}</span>
                        </div>
                    </div>
                    <mat-progress-bar class="mat-progress-bar" mode="indeterminate"></mat-progress-bar>`,
                    positive_snackbar_component_scss: `@import "../../../../assets/styles/theme.scss";

                    .matSnackBarComponent {
                        background-color: inherit;
                        border-radius: 0.5rem;
                        overflow: hidden;
                        width: 100%;
                    
                        .custom-snackbar {
                            display: flex;
                            flex-direction: row;
                            width: 100%;
                            border-radius: 0.3rem;
                            background-color: inherit;
                    
                            .matSnackBarLabel {
                                background-color: inherit;
                                color: $primary2;
                                font-size: small;
                                font-style: italic;
                            }
                        }
                    }
                    
                    .mat-progress-bar {
                        width: 100%;
                        background-color: inherit;
                    }`,
                    positive_snackbar_component_ts: `import { Component, Inject } from '@angular/core';
                    import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
                    
                    @Component({
                        selector: 'app-positive-snackbar',
                        templateUrl: './positive-snackbar.component.html',
                        styleUrls: ['./positive-snackbar.component.scss']
                    })
                    export class PositiveSnackbarComponent {
                        constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
                    }
                    `,
                    positive_snackbar_service_ts: `import { Injectable } from '@angular/core';
                    import { MatSnackBarRef, MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
                    import { PositiveSnackbarComponent } from './positive-snackbar.component';
                    
                    @Injectable({
                        providedIn: 'root'
                    })
                    export class PositiveSnackbarService {
                    
                        constructor(
                            private _snackBar: MatSnackBar,
                        ) { }
                    
                        openPositiveSnackbar(message: string): MatSnackBarRef<any> {
                            const config = new MatSnackBarConfig();
                            config.verticalPosition = 'bottom';
                            config.horizontalPosition = 'right';
                            config.duration = 3000;
                    
                            return this._snackBar.openFromComponent(PositiveSnackbarComponent, {
                                data: {
                                    message: message,
                                },
                                duration: config.duration,
                                verticalPosition: config.verticalPosition,
                                horizontalPosition: config.horizontalPosition,
                            });
                        }
                    }`,
                },
                negative_snackbar: {
                    negative_snackbar_component_html: `<div class="matSnackBarComponent" matSnackBarComponent>
                        <div class="custom-snackbar">
                            <span class="matSnackBarLabel" matSnackBarLabel>{{ data.message }}</span>
                        </div>
                    </div>
                    <mat-progress-bar class="mat-progress-bar" color="warn" mode="indeterminate"></mat-progress-bar>`,
                    negative_snackbar_component_scss: `@import "../../../../assets/styles/theme.scss";

                    .matSnackBarComponent {
                        background-color: inherit;
                        border-radius: 0.5rem;
                        overflow: hidden;
                        width: 100%;
                    
                        .custom-snackbar {
                            display: flex;
                            flex-direction: row;
                            width: 100%;
                            border-radius: 0.3rem;
                            background-color: inherit;
                    
                            .matSnackBarLabel {
                                background-color: inherit;
                                color: $primary2;
                                font-size: small;
                                font-style: italic;
                            }
                        }
                    }
                    
                    .mat-progress-bar {
                        width: 100%;
                        background-color: inherit;
                    }`,
                    negative_snackbar_component_ts: `import { Component, Inject } from '@angular/core';
                    import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
                    
                    @Component({
                      selector: 'app-negative-snackbar',
                      templateUrl: './negative-snackbar.component.html',
                      styleUrls: ['./negative-snackbar.component.scss']
                    })
                    export class NegativeSnackbarComponent {
                      constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
                    }`,
                    negative_snackbar_service_ts: `import { Injectable } from '@angular/core';
                    import { MatSnackBar, MatSnackBarRef, MatSnackBarConfig } from '@angular/material/snack-bar';
                    import { NegativeSnackbarComponent } from './negative-snackbar.component';
                    
                    @Injectable({
                        providedIn: 'root'
                    })
                    export class NegativeSnackbarService {
                    
                        constructor(
                            private _snackBar: MatSnackBar,
                        ) { }
                    
                        openNegativeSnackbar(message: string): MatSnackBarRef<any> {
                            const config = new MatSnackBarConfig();
                            config.verticalPosition = 'bottom';
                            config.horizontalPosition = 'right';
                            config.duration = 3000;
                    
                            return this._snackBar.openFromComponent(NegativeSnackbarComponent, {
                                data: {
                                    message: message,
                                },
                                duration: config.duration,
                                verticalPosition: config.verticalPosition,
                                horizontalPosition: config.horizontalPosition,
                            });
                        }
                    }`,
                },
            },
            warnings: {},
        },
        assets: {
            styles: {
                custom_theme_scss: `.home,
                .mat-toolbar-row,
                .mat-sidenav-wrapper {
                    background-color: $color9-primary;
                    color: $color0-primary;
                }
                
                // Socail media icon buttons
                .social-media-links {
                    background-color: $color9-primary;
                    color: $color4-accent;
                }
                
                .social-media-links:hover {
                    color: $color6-accent;
                }
                
                .mat-raised-button {
                    background-color: $color4-accent !important;
                    color: $color9-primary !important;
                }
                
                // Button with underline effect
                .button {
                    background-color: $color9-primary;
                    color: $color0-primary;
                    text-decoration: none;
                    font-size: small;
                    border-radius: 0;
                    width: max-content;
                    cursor: pointer;
                    border: none;
                
                    .underline {
                        position: relative;
                        margin-top: 0.1rem;
                        border-radius: 1rem;
                    }
                
                    .underline::before {
                        content: "";
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 0;
                        height: 1px;
                        background-color: $color0-primary;
                        transition: width 0.3s ease-in-out;
                    }
                }
                
                .button:hover .underline::before {
                    width: 100%;
                }
                
                .button:not(:hover) .underline::before {
                    transition: width 0.3s linear, width 0.3s cubic-bezier(0.82, 0.07, 0.37, 1);
                }
                
                // Cdk menu with fixed curtain effect
                .cdkMenu {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                    padding: 0.5rem 0.5rem 0 0.5rem;
                    box-shadow: 0.1rem 0.1rem 4px 1px #00000020;
                    margin-top: 0.5rem;
                    border-radius: 1rem;
                    overflow: hidden;
                    background-color: $color9-primary;
                
                    .cdkMenuItem {
                        margin: 0.5rem;
                        font-size: small;
                        background-color: $color9-primary;
                        border: none;
                    }
                }
                
                // Mat card
                .mat-card {
                    background-color: $color8-primary;
                    color: $color0-primary;
                }
                
                .mat-card-header {
                    background-color: $color4-accent;
                    color: $color9-primary;
                }
                
                .warning-message-wrapper {
                    background-color: $color0-warn;
                    color: $color9-warn;
                    font-style: italic;
                }
                
                // Mat icon
                .mat-icon {
                    color: $color4-warn;
                }`,
            }
        },
        index_html: `<!doctype html>
	<html lang="en">
	
	<head>
		<meta charset="utf-8">
		<title>${projectName}</title>
		<base href="/">
		<meta name="viewport" content="width=device-width, initial-scale=1">
	
		<!-- Cross Origin Opener Policy -->
		<meta name="Cross-Origin-Opener-Policy" content="same-origin">
	
		<!-- FAVICON -->
		<link rel="icon" type="image/x-icon" href="./assets//favicon_io/favicon.ico">
	
		<!-- FONTS -->
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	
		<!-- NOTO SANS -->
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link
			href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
			rel="stylesheet">
	</head>
	
	<body>
		<app-root></app-root>
	</body>
	
        </html>`,
        styles_scss: `// Custom Theming for Angular Material
    // For more information: https://material.angular.io/guide/theming
    @use '@angular/material' as mat;
    // Plus imports for other components in your app.
    
    // Include the common styles for Angular Material. We include this here so that you only
    // have to load a single css file for Angular Material in your app.
    // Be sure that you only ever include this mixin once!
    @include mat.core();
    
    .light-theme {
        // Define the palettes for your theme using the Material Design palettes available in palette.scss
        // (imported above). For each palette, you can optionally specify a default, lighter, and darker
        // hue. Available color palettes: https://material.io/design/color/
        $${projectName}-primary: mat.define-palette(mat.$gray-palette, 900);
        $${projectName}-accent: mat.define-palette(mat.$pink-palette, A200, A100, A400);
    
        // The warn palette is optional (defaults to red).
        $${projectName}-warn: mat.define-palette(mat.$red-palette);
    
        // Create the theme object. A theme consists of configurations for individual
        // theming systems such as "color" or "typography".
        $${projectName}-theme: mat.define-light-theme((color: (primary: $${projectName}-primary,
                        accent: $${projectName}-accent,
                        warn: $${projectName}-warn,
                    )));
    
        // Include theme styles for core and each component used in your app.
        // Alternatively, you can import and @include the theme mixins for each component
        // that you are using.
        @include mat.all-component-themes($${projectName}-theme);
        $color0-primary: mat.get-color-from-palette($${projectName}-primary, 50);
        $color1-primary: mat.get-color-from-palette($${projectName}-primary, 100);
        $color2-primary: mat.get-color-from-palette($${projectName}-primary, 200);
        $color3-primary: mat.get-color-from-palette($${projectName}-primary, 300);
        $color4-primary: mat.get-color-from-palette($${projectName}-primary, 400);
        $color5-primary: mat.get-color-from-palette($${projectName}-primary, 500);
        $color6-primary: mat.get-color-from-palette($${projectName}-primary, 600);
        $color7-primary: mat.get-color-from-palette($${projectName}-primary, 700);
        $color8-primary: mat.get-color-from-palette($${projectName}-primary, 800);
        $color9-primary: mat.get-color-from-palette($${projectName}-primary, 900);
    
        $color0-accent: mat.get-color-from-palette($${projectName}-accent, 50);
        $color1-accent: mat.get-color-from-palette($${projectName}-accent, 100);
        $color2-accent: mat.get-color-from-palette($${projectName}-accent, 200);
        $color3-accent: mat.get-color-from-palette($${projectName}-accent, 300);
        $color4-accent: mat.get-color-from-palette($${projectName}-accent, 400);
        $color5-accent: mat.get-color-from-palette($${projectName}-accent, 500);
        $color6-accent: mat.get-color-from-palette($${projectName}-accent, 600);
        $color7-accent: mat.get-color-from-palette($${projectName}-accent, 700);
        $color8-accent: mat.get-color-from-palette($${projectName}-accent, 800);
        $color9-accent: mat.get-color-from-palette($${projectName}-accent, 900);
    
        $color0-warn: mat.get-color-from-palette($${projectName}-warn, 50);
        $color1-warn: mat.get-color-from-palette($${projectName}-warn, 100);
        $color2-warn: mat.get-color-from-palette($${projectName}-warn, 200);
        $color3-warn: mat.get-color-from-palette($${projectName}-warn, 300);
        $color4-warn: mat.get-color-from-palette($${projectName}-warn, 400);
        $color5-warn: mat.get-color-from-palette($${projectName}-warn, 500);
        $color6-warn: mat.get-color-from-palette($${projectName}-warn, 600);
        $color7-warn: mat.get-color-from-palette($${projectName}-warn, 700);
        $color8-warn: mat.get-color-from-palette($${projectName}-warn, 800);
        $color9-warn: mat.get-color-from-palette($${projectName}-warn, 900);
    
        @import "./assets/styles/custom-theme";
    }
    
    .dark-theme {
        // Define the palettes for your theme using the Material Design palettes available in palette.scss
        // (imported above). For each palette, you can optionally specify a default, lighter, and darker
        // hue. Available color palettes: https://material.io/design/color/
        $${projectName}-primary: mat.define-palette(mat.$gray-palette, 900);
        $${projectName}-accent: mat.define-palette(mat.$pink-palette, A200, A100, A400);
    
        // The warn palette is optional (defaults to red).
        $${projectName}-warn: mat.define-palette(mat.$red-palette);
    
        // Create the theme object. A theme consists of configurations for individual
        // theming systems such as "color" or "typography".
        $${projectName}-theme: mat.define-dark-theme((color: (primary: $${projectName}-primary,
                        accent: $${projectName}-accent,
                        warn: $${projectName}-warn,
                    )));
    
        // Include theme styles for core and each component used in your app.
        // Alternatively, you can import and @include the theme mixins for each component
        // that you are using.
        @include mat.all-component-themes($${projectName}-theme);
        $color0-primary: mat.get-color-from-palette($${projectName}-primary, 900);
        $color1-primary: mat.get-color-from-palette($${projectName}-primary, 800);
        $color2-primary: mat.get-color-from-palette($${projectName}-primary, 700);
        $color3-primary: mat.get-color-from-palette($${projectName}-primary, 600);
        $color4-primary: mat.get-color-from-palette($${projectName}-primary, 500);
        $color5-primary: mat.get-color-from-palette($${projectName}-primary, 400);
        $color6-primary: mat.get-color-from-palette($${projectName}-primary, 300);
        $color7-primary: mat.get-color-from-palette($${projectName}-primary, 200);
        $color8-primary: mat.get-color-from-palette($${projectName}-primary, 100);
        $color9-primary: mat.get-color-from-palette($${projectName}-primary, 50);
    
        $color0-accent: mat.get-color-from-palette($${projectName}-accent, 900);
        $color1-accent: mat.get-color-from-palette($${projectName}-accent, 800);
        $color2-accent: mat.get-color-from-palette($${projectName}-accent, 700);
        $color3-accent: mat.get-color-from-palette($${projectName}-accent, 600);
        $color4-accent: mat.get-color-from-palette($${projectName}-accent, 500);
        $color5-accent: mat.get-color-from-palette($${projectName}-accent, 400);
        $color6-accent: mat.get-color-from-palette($${projectName}-accent, 300);
        $color7-accent: mat.get-color-from-palette($${projectName}-accent, 200);
        $color8-accent: mat.get-color-from-palette($${projectName}-accent, 100);
        $color9-accent: mat.get-color-from-palette($${projectName}-accent, 50);
    
        $color0-warn: mat.get-color-from-palette($${projectName}-warn, 900);
        $color1-warn: mat.get-color-from-palette($${projectName}-warn, 800);
        $color2-warn: mat.get-color-from-palette($${projectName}-warn, 700);
        $color3-warn: mat.get-color-from-palette($${projectName}-warn, 600);
        $color4-warn: mat.get-color-from-palette($${projectName}-warn, 500);
        $color5-warn: mat.get-color-from-palette($${projectName}-warn, 400);
        $color6-warn: mat.get-color-from-palette($${projectName}-warn, 300);
        $color7-warn: mat.get-color-from-palette($${projectName}-warn, 200);
        $color8-warn: mat.get-color-from-palette($${projectName}-warn, 100);
        $color9-warn: mat.get-color-from-palette($${projectName}-warn, 50);
    
        @import "./assets/styles/custom-theme";
    }
    
    /* You can add global styles to this file, and also import other style files */
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
    @import "./assets/styles/theme.scss";
    
    html,
    body {
        height: 100%;
    }
    
    body {
        margin: 0;
        font-family: 'Noto Sans', sans-serif !important;
    }
    
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        margin: 0 !important;
    }
    
    .matTooltipClass {
        font-size: small;
    }
    
    .mdc-list-item {
        justify-content: center !important;
    }
    
    // 	SNACKBAR
    .mdc-snackbar__surface {
        padding: 0 !important;
        border-radius: 0.3rem !important;
        background-color: #FDFCFF !important;
    }
    
    .mat-icon-button {
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        }`,
    }
}

try {
    execSync('ng --version', { stdio: 'ignore' });
} catch (error) {
    isAngularInstalled = false;
}

if (!isAngularInstalled) {
    execSync('npm install -g @angular/cli@16', { stdio: 'inherit' });
    console.log('Angular CLI installed successfully.');
}

function runCommand(command, directory) {
    try {
        execSync(command, { stdio: 'inherit', cwd: directory });
        console.log(`EXECUTED: ${command}`);
    } catch (error) {
        console.error(`Error running command: ${command}`);
        process.exit(1);
    }
}

runCommand(`${sudoCommand} ng new ${projectName} --routing --style=scss`, '.');
runCommand(`${sudoCommand} npm install bootstrap`, `./${projectName}`);
runCommand(`${sudoCommand} ng config "projects.${projectName}.architect.build.options.styles[1]" "./node_modules/bootstrap/dist/css/bootstrap.min.css"`, `./${projectName}`);
runCommand(`${sudoCommand} ng config "projects.${projectName}.architect.build.options.scripts[0]" "./node_modules/bootstrap/dist/js/bootstrap.min.js"`, `./${projectName}`);
runCommand(`${sudoCommand} ng add @angular/material --skip-confirmation --defaults --theme=custom --animations=enable`, `./${projectName}`);

runCommand(`${mkdir} styles`, `./${projectName}/src/assets`);
runCommand(`${mkdir} animations`, `./${projectName}/src/app`);
runCommand(`${mkdir} buttons`, `./${projectName}/src/app`);
runCommand(`${mkdir} directives`, `./${projectName}/src/app`);
runCommand(`${mkdir} interfaces`, `./${projectName}/src/app`);
runCommand(`${mkdir} modules`, `./${projectName}/src/app`);
runCommand(`${mkdir} navigations`, `./${projectName}/src/app`);
runCommand(`${mkdir} pages`, `./${projectName}/src/app`);
runCommand(`${mkdir} sections`, `./${projectName}/src/app`);
runCommand(`${mkdir} data`, `./${projectName}/src/app`);
runCommand(`${mkdir} shared`, `./${projectName}/src/app`);
runCommand(`${mkdir} snackbars`, `./${projectName}/src/app`);
runCommand(`${mkdir} warnings`, `./${projectName}/src/app`);
runCommand(`${mkdir} apis`, `./${projectName}/src/app/shared`);
runCommand(`${mkdir} breakpoints`, `./${projectName}/src/app/shared`);
runCommand(`${mkdir} buttons`, `./${projectName}/src/app/shared`);

runCommand(`${touch} custom-theme.scss`, `./${projectName}/src/assets/styles`);

runCommand(`${ng_generate_component} generic-button`, `./${projectName}/src/app/buttons`);
runCommand(`${ng_generate_component} generic-menu-button`, `./${projectName}/src/app/buttons`);
runCommand(`${ng_generate_component} page-not-found`, `./${projectName}/src/app/pages`);
runCommand(`${ng_generate_component} positive-snackbar`, `./${projectName}/src/app/snackbars`);
runCommand(`${ng_generate_component} negative-snackbar`, `./${projectName}/src/app/snackbars`);
runCommand(`${ng_generate_module} material`, `./${projectName}/src/app/modules`);
runCommand(`${ng_generate_service} animations`, `./${projectName}/src/app/animations`);
runCommand(`${ng_generate_service} scroll-to-top`, `./${projectName}/src/app/shared/buttons`);

fs.writeFileSync(`./${projectName}/src/assets/styles/custom-theme.scss`, projectData.src.assets.styles.custom_theme_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/index.html`, projectData.src.index_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/styles.scss`, projectData.src.styles_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/app.component.html`, projectData.src.app.app_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/animations/animations.service.ts`, projectData.src.app.animations.animations_service_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/page-not-found/page-not-found.component.html`, projectData.src.app.pages.page_not_found.page_not_found_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/page-not-found/page-not-found.component.scss`, projectData.src.app.pages.page_not_found.page_not_found_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/buttons/generic-button/generic-button.component.html`, projectData.src.app.buttons.generic_button.generic_button_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/buttons/generic-button/generic-button.component.ts`, projectData.src.app.buttons.generic_button.generic_button_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/modules/material/material.module.ts`, projectData.src.app.modules.material.material_module_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/shared/buttons/scroll-to-top.service.ts`, projectData.src.app.shared.buttons.scroll_to_top_service_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/positive-snackbar/positive-snackbar.component.html`, projectData.src.app.snackbars.positive_snackbar.positive_snackbar_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/positive-snackbar/positive-snackbar.component.scss`, projectData.src.app.snackbars.positive_snackbar.positive_snackbar_component_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/positive-snackbar/positive-snackbar.component.ts`, projectData.src.app.snackbars.positive_snackbar.positive_snackbar_component_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/positive-snackbar/positive-snackbar.service.ts`, projectData.src.app.snackbars.positive_snackbar.positive_snackbar_service_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/negative-snackbar/negative-snackbar.component.html`, projectData.src.app.snackbars.negative_snackbar.negative_snackbar_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/negative-snackbar/negative-snackbar.component.scss`, projectData.src.app.snackbars.negative_snackbar.negative_snackbar_component_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/negative-snackbar/negative-snackbar.component.ts`, projectData.src.app.snackbars.negative_snackbar.negative_snackbar_component_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/negative-snackbar/negative-snackbar.service.ts`, projectData.src.app.snackbars.negative_snackbar.negative_snackbar_service_ts, `${utf8}`);
