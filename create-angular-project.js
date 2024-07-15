const { execSync } = require('child_process');
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

                export class AnimationsService {}
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
            datasource: {
                home: {
                    home_datasource_service_ts: `import { Injectable } from '@angular/core';
                    
                    @Injectable({
                        providedIn: 'root'
                    })
                    export class HomeDatasourceService {
                    
                        protected homeData = [
                            {
                                name: "Section 1",
                                heading: "Heading",
                                subheading: "Subheading",
                                buttons: [
                                    {
                                        name: "Button",
                                        url: "button",
                                    },
                                ],
                            },
                            {
                                name: "Section 2",
                                heading: "Heading",
                                subheading: "Subheading",
                                buttons: [
                                    {
                                        name: "Button",
                                        url: "button",
                                    },
                                ],
                            },
                            {
                                name: "Section 3",
                                heading: "Heading",
                                subheading: "Subheading",
                                buttons: [
                                    {
                                        name: "Button",
                                        url: "button",
                                    },
                                ],
                            },
                            {
                                name: "Section 4",
                                heading: "Heading",
                                subheading: "Subheading",
                                buttons: [
                                    {
                                        name: "Button",
                                        url: "button",
                                    },
                                ],
                            },
                            {
                                name: "Section 5",
                                heading: "Heading",
                                subheading: "Subheading",
                                buttons: [
                                    {
                                        name: "Button",
                                        url: "button",
                                    },
                                ],
                            },
                            {
                                name: "Section 6",
                                heading: "Heading",
                                subheading: "Subheading",
                                buttons: [
                                    {
                                        name: "Button",
                                        url: "button",
                                    },
                                ],
                            },
                            {
                                name: "Section 7",
                                heading: "Heading",
                                subheading: "Subheading",
                                buttons: [
                                    {
                                        name: "Button",
                                        url: "button",
                                    },
                                ],
                            },
                            {
                                name: "Section 8",
                                heading: "Heading",
                                subheading: "Subheading",
                                buttons: [
                                    {
                                        name: "Button",
                                        url: "button",
                                    },
                                ],
                            },
                            {
                                name: "Section 9",
                                heading: "Heading",
                                subheading: "Subheading",
                                buttons: [
                                    {
                                        name: "Button",
                                        url: "button",
                                    },
                                ],
                            },
                            {
                                name: "Section 10",
                                heading: "Heading",
                                subheading: "Subheading",
                                buttons: [
                                    {
                                        name: "Button",
                                        url: "button",
                                    },
                                ],
                            },
                        ];
                    
                        getHomeDatasourceService() {
                            return this.homeData;
                        }
                    }`,
                },
                navigation: {
                    navigation_datasource_service_ts: `import { Injectable } from '@angular/core';

                    @Injectable({
                        providedIn: 'root'
                    })
                    export class NavigationDatasourceService {
                        protected navigationData = [
                            {
                                name: "Navigation",
                                navigation: [
                                    {
                                        name: "Home",
                                        routerLink: "",
                                        disabled: false,
                                    },
                                    {
                                        name: "About",
                                        routerLink: "about",
                                        disabled: false,
                                    },
                                    {
                                        name: "Contact",
                                        routerLink: "contact",
                                        disabled: false,
                                    },
                                ],
                            },
                            {
                                name: "Products",
                                menu: [
                                    {
                                        name: "Product 1",
                                        routerLink: "product1",
                                        disabled: false,
                                    },
                                    {
                                        name: "Product 2",
                                        routerLink: "product2",
                                        disabled: false,
                                    },
                                    {
                                        name: "Product 3",
                                        routerLink: "product3",
                                        disabled: false,
                                    },
                                    {
                                        name: "Product 4",
                                        routerLink: "product4",
                                        disabled: false,
                                    },
                                    {
                                        name: "Product 5",
                                        routerLink: "product5",
                                        disabled: false,
                                    },
                                ],
                                disabled: false,
                            },
                            {
                                name: "Services",
                                menu: [
                                    {
                                        name: "Service 1",
                                        routerLink: "service1",
                                        disabled: false,
                                    },
                                    {
                                        name: "Service 2",
                                        routerLink: "service2",
                                        disabled: false,
                                    },
                                    {
                                        name: "Service 3",
                                        routerLink: "service3",
                                        disabled: false,
                                    },
                                    {
                                        name: "Service 4",
                                        routerLink: "service4",
                                        disabled: false,
                                    },
                                    {
                                        name: "Service 5",
                                        routerLink: "service5",
                                        disabled: false,
                                    },
                                ],
                                disabled: false,
                            },
                            {
                                name: "Legal",
                                legal: [
                                    {
                                        name: "Privacy Policy",
                                        routerLink: "legal/privacy-policy",
                                        disabled: false,
                                    },
                                    {
                                        name: "Terms & Conditions",
                                        routerLink: "legal/terms-and-conditions",
                                        disabled: false,
                                    },
                                ],
                            },
                            {
                                name: "Opportunities",
                                opportunities: [
                                    {
                                        name: "Careers",
                                        routerLink: "Careers",
                                        disabled: false,
                                    },
                                ],
                            },
                        ];
                    
                        getNavigationData() {
                            return this.navigationData;
                        }
                    }`,
                },
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
                    header_component_html: `<mat-toolbar class="mat-toolbar">
                    <mat-toolbar-row class="mat-toolbar-row mtr1">
                        <div class="logo-wrapper">
                            <app-logo-button class="logo-button"></app-logo-button>
                            <h6 class="h6">${projectName.toUpperCase()}</h6>
                        </div>
                        <div class="button-wrapper" *ngIf="!(isHandset$ | async)">
                            <app-generic-page-button [navigationData]="navigationData[0].navigation[0]"
                                class="button"></app-generic-page-button>
                            <app-generic-menu-button [navigationData]="navigationData[1]" class="button"></app-generic-menu-button>
                            <app-generic-menu-button [navigationData]="navigationData[2]" class="button"></app-generic-menu-button>
                            <app-generic-page-button [navigationData]="navigationData[0].navigation[1]"
                                class="button"></app-generic-page-button>
                            <app-generic-page-button [navigationData]="navigationData[0].navigation[2]"
                                class="button"></app-generic-page-button>
                        </div>
                        <div class="menu-wrapper" >
                            <button class="mat-icon-button" (click)="changeTheme()" [matTooltip]="isLighttheme ? 'Light' : 'Dark'"
                                matTooltipClass="matTooltipClass" mat-icon-button>
                                <mat-icon class="mat-icon">{{ !isLighttheme ? "light_mode" : "dark_mode" }}</mat-icon>
                            </button>
                            <button class="mat-icon-button" *ngIf="(isHandset$ | async)" (click)="sidenav.toggle()" mat-icon-button>
                                <mat-icon class="mat-icon">menu</mat-icon>
                            </button>
                        </div>
                    </mat-toolbar-row>
                    </mat-toolbar>`,
                    header_component_scss: `@media screen and (min-width: 0px) {
                        .mat-toolbar {
                            .mtr1 {
                                position: fixed;
                                top: 0;
                                z-index: 99;
                                height: 4rem;
                                width: 100%;
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                                align-items: center;
                    
                                .logo-wrapper {
                                    display: flex;
                                    align-items: flex-end;
                    
                                    .logo-button {
                                        margin: 0 2rem 0 0;
                                    }
                    
                                    .h6 {
                                        font-weight: bold;
                                        text-transform: uppercase;
                                    }
                                }
                    
                                .button-wrapper {
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                    
                                    .button {
                                        margin: 0 2rem 0 0;
                                    }
                                }
                    
                                .menu-wrapper {
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                    
                                    .mat-icon-button {
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                    }
                                }
                            }
                        }
                    }`,
                    header_component_ts: `import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
                    import { DOCUMENT } from '@angular/common';
                    import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
                    import { Observable, map, shareReplay } from 'rxjs';
                    import { NavigationDatasourceService } from 'src/app/datasource/navigation/navigation-datasource.service';
                    
                    @Component({
                        selector: 'app-header',
                        templateUrl: './header.component.html',
                        styleUrls: ['./header.component.scss']
                    })
                    export class HeaderComponent implements OnInit {
                        navigationData!: any;
                        isLighttheme: boolean = false;
                    
                        constructor(
                            @Inject(DOCUMENT) private document: Document,
                            private render: Renderer2,
                            private breakpointObserver: BreakpointObserver,
                            private navigationDatasourceService: NavigationDatasourceService,
                        ) {
                            this.navigationData = navigationDatasourceService.getNavigationData();
                        }
                    
                        ngOnInit(): void {
                            this.isLighttheme ? this.render.addClass(this.document.body, 'light-theme') : this.render.addClass(this.document.body, 'dark-theme');
                        }
                    
                        isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
                            .pipe(
                                map(result => result.matches),
                                shareReplay()
                            );
                    
                        onClick() {
                            window.scrollTo(0, 0);
                        }
                    
                        changeTheme() {
                            this.isLighttheme = !this.isLighttheme;
                    
                            this.isLighttheme ? (
                                this.render.removeClass(this.document.body, 'dark-theme'),
                                this.render.addClass(this.document.body, 'light-theme')
                            ) : (
                                this.render.removeClass(this.document.body, 'light-theme'),
                                this.render.addClass(this.document.body, 'dark-theme')
                            );
                        }
                    }`,
                },
                footer: {
                    footer_component_html: `<div class="container-fluid home">
                    <div class="row r1">
                        <div class="col-lg-3 r1c1">
                            <div class="wrapper">
                                <h6 class="h6">{{navigationData[3].name}}</h6>
                                <div class="button-wrapper" *ngFor="let data of navigationData[3].legal">
                                    <button class="button" *ngIf="navigationData[3].name === 'Legal' && !data.disabled"
                                        [routerLink]="data.routerLink" (click)="scrollToTopService.onClick()">
                                        <p class="p">{{data.name}}</p>
                                        <div class="underline"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 r1c1">
                            <div class="wrapper">
                                <h6 class="h6">{{navigationData[0].name}}</h6>
                                <div class="button-wrapper" *ngFor="let data of navigationData[0].navigation">
                                    <button class="button" *ngIf="navigationData[0].name === 'Navigation' && !data.disabled"
                                        [routerLink]="data.routerLink" (click)="scrollToTopService.onClick()">
                                        <p class="p">{{data.name}}</p>
                                        <div class="underline"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 r1c1">
                            <div class="wrapper">
                                <h6 class="h6">{{navigationData[1].name}}</h6>
                                <div class="button-wrapper" *ngFor="let data of navigationData[1].menu">
                                    <a class="button" *ngIf="navigationData[1].name === 'Products' && !data.disabled"
                                        [href]="data.routerLink" target="_blank" (click)="scrollToTopService.onClick()">
                                        <p class="p">{{data.name}}</p>
                                        <div class="underline"></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 r1c1">
                            <div class="wrapper">
                                <h6 class="h6">{{navigationData[2].name}}</h6>
                                <div class="button-wrapper" *ngFor="let data of navigationData[2].menu">
                                    <button class="button" *ngIf="navigationData[2].name === 'Services' && !data.disabled"
                                        [routerLink]="data.routerLink" (click)="scrollToTopService.onClick()">
                                        <p class="p">{{data.name}}</p>
                                        <div class="underline"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 r1c1">
                            <div class="wrapper">
                                <div class="wrapper">
                                    <h6 class="h6">{{navigationData[4].name}}</h6>
                                    <div class="button-wrapper" *ngFor="let data of navigationData[4].opportunities">
                                        <button class="button" *ngIf="navigationData[4].name === 'Opportunities' && !data.disabled"
                                            [routerLink]="data.routerLink" (click)="scrollToTopService.onClick()">
                                            <p class="p">{{data.name}}</p>
                                            <div class="underline"></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div class="row r2">
                        <div class="col-lg-12 r2c1">
                            <app-logo-button class="logo-button"></app-logo-button>
                
                            <div class="social-media-icons">
                                <ng-container *ngFor="let data of socialMediaData">
                                    <a class="social-media-links" target="_blank">
                                        <i [class]="data.class"></i>
                                    </a>
                                </ng-container>
                            </div>
                        </div>
                    </div>
                
                    <div class="row r3">
                        <div class="col-lg-12 r3c1">
                            <div class="wrapper">
                                <p class="p">${projectName} Pvt Ltd. Web Dev.</p>
                                <p class="p">All Rights Reserved © 2024</p>
                            </div>
                        </div>
                    </div>
                    </div>`,
                    footer_component_scss: `@import '../../../assets/styles/theme.scss';

                    @media screen and (min-width: 0px) {
                        .home {
                            padding-bottom: 4rem;
                    
                            .r1 {
                                padding: 4rem 0;
                                display: flex;
                                align-items: flex-start;
                                justify-content: center;
                    
                                .r1c1 {
                                    display: flex;
                                    flex-direction: column;
                                    align-items: flex-start;
                                    justify-content: center;
                                    width: 300px;
                                    padding: 4rem 0;
                    
                                    .wrapper {
                                        display: flex;
                                        flex-direction: column;
                                        align-items: flex-start;
                                        justify-content: center;
                    
                                        .h6,
                                        .button {
                                            padding: 0.5rem;
                                        }
                    
                                        .button {
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
                                                transition: width 0.3s ease-in-out;
                                            }
                                        }
                    
                                        .button:hover .underline::before {
                                            width: 100%;
                                        }
                    
                                        .button:not(:hover) .underline::before {
                                            transition: width 0.3s linear, width 0.3s cubic-bezier(0.82, 0.07, 0.37, 1);
                                        }
                                    }
                                }
                            }
                    
                            .r2 {
                                .r2c1 {
                                    text-align: center;
                    
                                    .social-media-icons {
                                        display: flex;
                                        flex-direction: row;
                                        justify-content: center;
                                        align-items: center;
                                        margin-top: 1rem;
                                        margin-bottom: 1rem;
                    
                                        .social-media-links {
                                            padding: 1rem;
                    
                                            .bi {
                                                transition: .3s;
                                                font-size: 20px;
                                            }
                    
                                            .bi:hover {
                                                transition: .3s;
                                            }
                                        }
                                    }
                                }
                            }
                    
                            .r3 {
                                .r3c1 {
                                    text-align: center;
                    
                                    .wrapper {
                                        padding: 2rem 0;
                    
                                        .p {
                                            font-size: small;
                                            text-transform: uppercase;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                    @media screen and (min-width: 600px) {
                        .home {
                            .r1 {
                                .r1c1 {
                                    align-items: center;
                                }
                            }
                        }
                    }`,
                    footer_component_ts: `import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
                    import { Component } from '@angular/core';
                    import { Observable, map, shareReplay } from 'rxjs';
                    import { FooterDatasourceService } from 'src/app/services/navigations/footer/footer-datasource.service';
                    import { NavigationDatasourceService } from 'src/app/datasource/navigation/navigation-datasource.service';
                    import { ScrollToTopService } from 'src/app/shared/buttons/scroll-to-top.service';
                    
                    @Component({
                        selector: 'app-footer',
                        templateUrl: './footer.component.html',
                        styleUrls: ['./footer.component.scss']
                    })
                    export class FooterComponent {
                        navigationData!: any;
                        socialMediaData!: any;
                    
                        constructor(
                            protected scrollToTopService: ScrollToTopService,
                            private breakpointObserver: BreakpointObserver,
                            private navigationDatasourceService: NavigationDatasourceService,
                            private footerDatasourceService: FooterDatasourceService,
                        ) {
                            this.navigationData = navigationDatasourceService.getNavigationData();
                            this.socialMediaData = footerDatasourceService.getSocialMediaData();
                        }
                    
                        isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
                            .pipe(
                                map(result => result.matches),
                                shareReplay()
                            );
                    
                        onClick() {
                            window.scrollTo(0, 0);
                        }
                    }`,
                },
            },
            pages: {
                page_not_found: {
                    page_not_found_component_html: `<div class="home">
                <mat-card class="mat-card">
                    <h1 class="h1">Oops! We can't find that page.</h1>
                </mat-card>
                    </div>`,
                    page_not_found_component_scss: `@import '../../../assets/styles/material-palettes.scss';

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
                projectName: {
                    projectName_routing_module_ts: `import { NgModule } from '@angular/core';
                    import { RouterModule, Routes } from '@angular/router';
                    import { ${projectName.charAt(0).toUpperCase() + projectName.slice(1).toLowerCase()}Component } from './${projectName.toLowerCase()}.component';
                    import { HomeComponent } from '../home/home.component';
                    import { AboutComponent } from '../about/about.component';
                    import { ContactComponent } from '../contact/contact.component';
                    import { CareersComponent } from '../careers/careers.component';
                    import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';
                    import { TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';
                    
                    const routes: Routes = [
                        {
                            path: '', 
                            component: ${projectName.charAt(0).toUpperCase() + projectName.slice(1).toLowerCase()}Component,
                            children: [
                                { path: '', component: HomeComponent },
                                { path: 'about', component: AboutComponent },
                                { path: 'contact', component: ContactComponent },
                                { path: 'careers', component: CareersComponent },
                    
                                { path: 'legal/privacy-policy', component: PrivacyPolicyComponent },
                                { path: 'legal/terms-and-conditions', component: TermsAndConditionsComponent },
                            ]
                        },
                    ];
                    
                    @NgModule({
                        imports: [RouterModule.forChild(routes)],
                        exports: [RouterModule]
                    })
                    export class ${projectName.charAt(0).toUpperCase() + projectName.slice(1).toLowerCase()}RoutingModule { }`,
                    projectName_component_html: `<app-header></app-header>

                    <mat-sidenav-container class="mat-sidenav-container">
                        <mat-sidenav #sidenav mode="side" closed class="mat-sidenav" fixedInViewport fixedTopGap="56" mode="over">
                            <div class="mat-sidenav-wrapper">
                                <h6 class="h6">Navigation</h6>
                                <app-generic-button class="app-generic-button" [navigationData]="navigationData[0].navigation[0]"
                                    class="button"></app-generic-button>
                                <app-generic-button class="app-generic-button" [navigationData]="navigationData[0].navigation[1]"
                                    class="button"></app-generic-button>
                                <app-generic-button class="app-generic-button"
                                    [navigationData]="navigationData[0].navigation[2]"></app-generic-button>
                            </div>
                            <div class="mat-sidenav-wrapper">
                                <h6 class="h6">Products</h6>
                                <app-generic-button class="app-generic-button" [navigationData]="navigationData[1].menu[0]"
                                    class="button"></app-generic-button>
                            </div>
                            <div class="mat-sidenav-wrapper">
                                <h6 class="h6">Services</h6>
                                <app-generic-button class="app-generic-button" [navigationData]="navigationData[2].menu[0]"
                                    class="button"></app-generic-button>
                                <app-generic-button class="app-generic-button" [navigationData]="navigationData[2].menu[1]"
                                    class="button"></app-generic-button>
                            </div>
                            <div class="mat-sidenav-wrapper">
                                <h6 class="h6">Opportunities</h6>
                                <app-generic-button class="app-generic-button" [navigationData]="navigationData[4].opportunities[0]"
                                    class="button"></app-generic-button>
                            </div>
                            <div class="mat-sidenav-wrapper">
                                <h6 class="h6">Legal</h6>
                                <app-generic-button class="app-generic-button" [navigationData]="navigationData[3].legal[0]"
                                    class="button"></app-generic-button>
                                <app-generic-button class="app-generic-button" [navigationData]="navigationData[3].legal[1]"
                                    class="button"></app-generic-button>
                            </div>
                            <mat-divider></mat-divider>
                        </mat-sidenav>
                    
                        <!-- MAT SIDE NAV CONTENT -->
                        <mat-sidenav-content class="mat-sidenav-content">
                            <router-outlet></router-outlet>
                        </mat-sidenav-content>
                    </mat-sidenav-container>
                    
                    <app-site-under-development></app-site-under-development>
                    
                    <app-footer></app-footer>`,
                    projectName_component_scss: `@import '../../../assets/styles/theme.scss';

                    @media screen and (min-width: 0px) {
                        .mat-sidenav-container {
                            .mat-sidenav {
                                min-height: 100vh;
                                width: 100%;
                                height: 100%;
                                padding-bottom: 4rem;
                    
                                .mat-sidenav-wrapper {
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: flex-start;
                                    align-items: flex-start;
                                    padding: 2rem;
                    
                                    .h6 {
                                        font-weight: bold;
                                        text-transform: uppercase;
                                    }
                                }
                            }
                    
                            .mat-sidenav-content {
                                background-color: $white;
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }`,
                    projectName_component_ts: `import { Component } from '@angular/core';
                    import { NavigationDatasourceService } from 'src/app/datasource/navigation/navigation-datasource.service';
                    
                    @Component({
                        selector: 'app-${projectName.toLowerCase()}',
                        templateUrl: './${projectName.toLowerCase()}.component.html',
                        styleUrls: ['./${projectName.toLowerCase()}.component.scss']
                    })
                    export class ${projectName.charAt(0).toUpperCase() + projectName.slice(1).toLowerCase()}Component {
                        navigationData!: any;
                    
                        constructor(
                            private navigationDatasourceService: NavigationDatasourceService,
                        ) {
                            this.navigationData = navigationDatasourceService.getNavigationData();
                        }
                    }`,
                    projectName_module_ts: `import { NgModule } from '@angular/core';
                    import { CommonModule } from '@angular/common';
                    
                    import { ${projectName.charAt(0).toUpperCase() + projectName.slice(1).toLowerCase()}RoutingModule } from './${projectName.toLowerCase()}-routing.module';
                    import { MaterialModule } from 'src/app/modules/material/material.module';
                    
                    
                    @NgModule({
                        declarations: [],
                        imports: [
                            CommonModule,
                            ${projectName.charAt(0).toUpperCase() + projectName.slice(1).toLowerCase()}RoutingModule,
                            MaterialModule,
                        ]
                    })
                    export class ${projectName.charAt(0).toUpperCase() + projectName.slice(1).toLowerCase()}Module { }
                    `,
                },
                home: {
                    home_component_html: `<div class="container-fluid home">
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 1</h1>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 2</h1>
                        </div>
                    </div>
                    <div class="row r1">
                            <div class="col-lg-12 r1c1">
                                <h1 class="h1">Section 3</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 4</h1>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 5</h1>
                        </div>
                    </div>`,
                    home_component_scss: `.home {
                        .r1 {
                            .r1c1 {
                                height: 100%;
                                width: 100%;
                                padding: 0;
                            }
                        }
                    }`,
                    home_component_ts: ``,
                },
                about: {
                    about_component_html: `<div class="container-fluid home">
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 1</h1>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 2</h1>
                        </div>
                    </div>
                    <div class="row r1">
                            <div class="col-lg-12 r1c1">
                                <h1 class="h1">Section 3</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 4</h1>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 5</h1>
                        </div>
                    </div>`,
                    about_component_scss: `.home {
                        .r1 {
                            .r1c1 {
                                height: 100%;
                                width: 100%;
                                padding: 0;
                            }
                        }
                    }`,
                    about_component_ts: ``,
                },
                contact: {
                    contact_component_html: `<div class="container-fluid home">
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 1</h1>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 2</h1>
                        </div>
                    </div>
                    <div class="row r1">
                            <div class="col-lg-12 r1c1">
                                <h1 class="h1">Section 3</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 4</h1>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 5</h1>
                        </div>
                    </div>`,
                    contact_component_scss: `.home {
                        .r1 {
                            .r1c1 {
                                height: 100%;
                                width: 100%;
                                padding: 0;
                            }
                        }
                    }`,
                    contact_component_ts: ``,
                },
                careers: {
                    careers_component_html: `<div class="container-fluid home">
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 1</h1>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 2</h1>
                        </div>
                    </div>
                    <div class="row r1">
                            <div class="col-lg-12 r1c1">
                                <h1 class="h1">Section 3</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 4</h1>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 5</h1>
                        </div>
                    </div>`,
                    careers_component_scss: `.home {
                        .r1 {
                            .r1c1 {
                                height: 100%;
                                width: 100%;
                                padding: 0;
                            }
                        }
                    }`,
                    careers_component_ts: ``,
                },
                privacy_policy: {
                    privacy_policy_component_html: `<div class="container-fluid home">
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 1</h1>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 2</h1>
                        </div>
                    </div>
                    <div class="row r1">
                            <div class="col-lg-12 r1c1">
                                <h1 class="h1">Section 3</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 4</h1>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 5</h1>
                        </div>
                    </div>`,
                    privacy_policy_component_scss: `.home {
                        .r1 {
                            .r1c1 {
                                height: 100%;
                                width: 100%;
                                padding: 0;
                            }
                        }
                    }`,
                    privacy_policy_component_ts: ``,
                },
                terms_and_conditions: {
                    terms_and_conditions_component_html: `<div class="container-fluid home">
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 1</h1>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 2</h1>
                        </div>
                    </div>
                    <div class="row r1">
                            <div class="col-lg-12 r1c1">
                                <h1 class="h1">Section 3</h1>
                            </div>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 4</h1>
                        </div>
                    </div>
                    <div class="row r1">
                        <div class="col-lg-12 r1c1">
                            <h1 class="h1">Section 5</h1>
                        </div>
                    </div>`,
                    terms_and_conditions_component_scss: `.home {
                        .r1 {
                            .r1c1 {
                                height: 100%;
                                width: 100%;
                                padding: 0;
                            }
                        }
                    }`,
                    terms_and_conditions_component_ts: ``,
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
            ${projectName}-primary: mat.define-palette(mat.$gray-palette);
            ${projectName}-accent: mat.define-palette(mat.$orange-palette);
        
            // The warn palette is optional (defaults to red).
            ${projectName}-warn: mat.define-palette(mat.$red-palette);
        
            // Extra color palettes
            ${projectName}-pink: mat.define-palette(mat.$pink-palette);
            ${projectName}-purple: mat.define-palette(mat.$purple-palette);
            ${projectName}-deep-purple: mat.define-palette(mat.$deep-purple-palette);
            ${projectName}-indigo: mat.define-palette(mat.$indigo-palette);
            ${projectName}-blue: mat.define-palette(mat.$blue-palette);
            ${projectName}-light-blue: mat.define-palette(mat.$light-blue-palette);
            ${projectName}-cyan: mat.define-palette(mat.$cyan-palette);
            ${projectName}-teal: mat.define-palette(mat.$teal-palette);
            ${projectName}-green: mat.define-palette(mat.$green-palette);
            ${projectName}-light-green: mat.define-palette(mat.$light-green-palette);
            ${projectName}-lime: mat.define-palette(mat.$lime-palette);
            ${projectName}-yellow: mat.define-palette(mat.$yellow-palette);
            ${projectName}-amber: mat.define-palette(mat.$amber-palette);
            ${projectName}-deep-orange: mat.define-palette(mat.$deep-orange-palette);
            ${projectName}-brown: mat.define-palette(mat.$brown-palette);
            ${projectName}-blue-gray: mat.define-palette(mat.$blue-gray-palette);
        
            // Create the theme object. A theme consists of configurations for individual
            // theming systems such as "color" or "typography".
            ${projectName}-theme: mat.define-light-theme((color: (primary: ${projectName}-primary,
                            accent: ${projectName}-accent,
                            warn: ${projectName}-warn,
        
                            // Extra color palettes
                            pink: ${projectName}-pink,
                            purple: ${projectName}-purple,
                            deep-purple: ${projectName}-deep-purple,
                            blue: ${projectName}-blue,
                            light-blue: ${projectName}-light-blue,
                            indigo: ${projectName}-indigo,
                            cyan: ${projectName}-cyan,
                            teal: ${projectName}-teal,
                            green: ${projectName}-green,
                            light-green: ${projectName}-light-green,
                            lime: ${projectName}-lime,
                            yellow: ${projectName}-yellow,
                            amber: ${projectName}-amber,
                            deep-orange: ${projectName}-deep-orange,
                            brown: ${projectName}-brown,
                            blue-gray: ${projectName}-blue-gray,
                        )));
        
            // Include theme styles for core and each component used in your app.
            // Alternatively, you can import and @include the theme mixins for each component
            // that you are using.
            @include mat.all-component-themes(${projectName}-theme);
        
            $color0-primary: mat.get-color-from-palette(${projectName}-primary, 900);
            $color1-primary: mat.get-color-from-palette(${projectName}-primary, 800);
            $color2-primary: mat.get-color-from-palette(${projectName}-primary, 700);
            $color3-primary: mat.get-color-from-palette(${projectName}-primary, 600);
            $color4-primary: mat.get-color-from-palette(${projectName}-primary, 500);
            $color5-primary: mat.get-color-from-palette(${projectName}-primary, 400);
            $color6-primary: mat.get-color-from-palette(${projectName}-primary, 300);
            $color7-primary: mat.get-color-from-palette(${projectName}-primary, 200);
            $color8-primary: mat.get-color-from-palette(${projectName}-primary, 100);
            $color9-primary: mat.get-color-from-palette(${projectName}-primary, 50);
        
            $color0-accent: mat.get-color-from-palette(${projectName}-accent, 900);
            $color1-accent: mat.get-color-from-palette(${projectName}-accent, 800);
            $color2-accent: mat.get-color-from-palette(${projectName}-accent, 700);
            $color3-accent: mat.get-color-from-palette(${projectName}-accent, 600);
            $color4-accent: mat.get-color-from-palette(${projectName}-accent, 500);
            $color5-accent: mat.get-color-from-palette(${projectName}-accent, 400);
            $color6-accent: mat.get-color-from-palette(${projectName}-accent, 300);
            $color7-accent: mat.get-color-from-palette(${projectName}-accent, 200);
            $color8-accent: mat.get-color-from-palette(${projectName}-accent, 100);
            $color9-accent: mat.get-color-from-palette(${projectName}-accent, 50);
        
            $color0-warn: mat.get-color-from-palette(${projectName}-warn, 900);
            $color1-warn: mat.get-color-from-palette(${projectName}-warn, 800);
            $color2-warn: mat.get-color-from-palette(${projectName}-warn, 700);
            $color3-warn: mat.get-color-from-palette(${projectName}-warn, 600);
            $color4-warn: mat.get-color-from-palette(${projectName}-warn, 500);
            $color5-warn: mat.get-color-from-palette(${projectName}-warn, 400);
            $color6-warn: mat.get-color-from-palette(${projectName}-warn, 300);
            $color7-warn: mat.get-color-from-palette(${projectName}-warn, 200);
            $color8-warn: mat.get-color-from-palette(${projectName}-warn, 100);
            $color9-warn: mat.get-color-from-palette(${projectName}-warn, 50);
        
            // Start
            $color0-pink: mat.get-color-from-palette(${projectName}-pink, 900);
            $color1-pink: mat.get-color-from-palette(${projectName}-pink, 800);
            $color2-pink: mat.get-color-from-palette(${projectName}-pink, 700);
            $color3-pink: mat.get-color-from-palette(${projectName}-pink, 600);
            $color4-pink: mat.get-color-from-palette(${projectName}-pink, 500);
            $color5-pink: mat.get-color-from-palette(${projectName}-pink, 400);
            $color6-pink: mat.get-color-from-palette(${projectName}-pink, 300);
            $color7-pink: mat.get-color-from-palette(${projectName}-pink, 200);
            $color8-pink: mat.get-color-from-palette(${projectName}-pink, 100);
            $color9-pink: mat.get-color-from-palette(${projectName}-pink, 50);
        
            $color0-purple: mat.get-color-from-palette(${projectName}-purple, 900);
            $color1-purple: mat.get-color-from-palette(${projectName}-purple, 800);
            $color2-purple: mat.get-color-from-palette(${projectName}-purple, 700);
            $color3-purple: mat.get-color-from-palette(${projectName}-purple, 600);
            $color4-purple: mat.get-color-from-palette(${projectName}-purple, 500);
            $color5-purple: mat.get-color-from-palette(${projectName}-purple, 400);
            $color6-purple: mat.get-color-from-palette(${projectName}-purple, 300);
            $color7-purple: mat.get-color-from-palette(${projectName}-purple, 200);
            $color8-purple: mat.get-color-from-palette(${projectName}-purple, 100);
            $color9-purple: mat.get-color-from-palette(${projectName}-purple, 50);
        
            $color0-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 900);
            $color1-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 800);
            $color2-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 700);
            $color3-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 600);
            $color4-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 500);
            $color5-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 400);
            $color6-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 300);
            $color7-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 200);
            $color8-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 100);
            $color9-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 50);
        
            $color0-blue: mat.get-color-from-palette(${projectName}-blue, 900);
            $color1-blue: mat.get-color-from-palette(${projectName}-blue, 800);
            $color2-blue: mat.get-color-from-palette(${projectName}-blue, 700);
            $color3-blue: mat.get-color-from-palette(${projectName}-blue, 600);
            $color4-blue: mat.get-color-from-palette(${projectName}-blue, 500);
            $color5-blue: mat.get-color-from-palette(${projectName}-blue, 400);
            $color6-blue: mat.get-color-from-palette(${projectName}-blue, 300);
            $color7-blue: mat.get-color-from-palette(${projectName}-blue, 200);
            $color8-blue: mat.get-color-from-palette(${projectName}-blue, 100);
            $color9-blue: mat.get-color-from-palette(${projectName}-blue, 50);
        
            $color0-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 900);
            $color1-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 800);
            $color2-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 700);
            $color3-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 600);
            $color4-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 500);
            $color5-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 400);
            $color6-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 300);
            $color7-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 200);
            $color8-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 100);
            $color9-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 50);
        
            $color0-indigo: mat.get-color-from-palette(${projectName}-indigo, 900);
            $color1-indigo: mat.get-color-from-palette(${projectName}-indigo, 800);
            $color2-indigo: mat.get-color-from-palette(${projectName}-indigo, 700);
            $color3-indigo: mat.get-color-from-palette(${projectName}-indigo, 600);
            $color4-indigo: mat.get-color-from-palette(${projectName}-indigo, 500);
            $color5-indigo: mat.get-color-from-palette(${projectName}-indigo, 400);
            $color6-indigo: mat.get-color-from-palette(${projectName}-indigo, 300);
            $color7-indigo: mat.get-color-from-palette(${projectName}-indigo, 200);
            $color8-indigo: mat.get-color-from-palette(${projectName}-indigo, 100);
            $color9-indigo: mat.get-color-from-palette(${projectName}-indigo, 50);
        
            $color0-cyan: mat.get-color-from-palette(${projectName}-cyan, 900);
            $color1-cyan: mat.get-color-from-palette(${projectName}-cyan, 800);
            $color2-cyan: mat.get-color-from-palette(${projectName}-cyan, 700);
            $color3-cyan: mat.get-color-from-palette(${projectName}-cyan, 600);
            $color4-cyan: mat.get-color-from-palette(${projectName}-cyan, 500);
            $color5-cyan: mat.get-color-from-palette(${projectName}-cyan, 400);
            $color6-cyan: mat.get-color-from-palette(${projectName}-cyan, 300);
            $color7-cyan: mat.get-color-from-palette(${projectName}-cyan, 200);
            $color8-cyan: mat.get-color-from-palette(${projectName}-cyan, 100);
            $color9-cyan: mat.get-color-from-palette(${projectName}-cyan, 50);
        
            $color0-teal: mat.get-color-from-palette(${projectName}-teal, 900);
            $color1-teal: mat.get-color-from-palette(${projectName}-teal, 800);
            $color2-teal: mat.get-color-from-palette(${projectName}-teal, 700);
            $color3-teal: mat.get-color-from-palette(${projectName}-teal, 600);
            $color4-teal: mat.get-color-from-palette(${projectName}-teal, 500);
            $color5-teal: mat.get-color-from-palette(${projectName}-teal, 400);
            $color6-teal: mat.get-color-from-palette(${projectName}-teal, 300);
            $color7-teal: mat.get-color-from-palette(${projectName}-teal, 200);
            $color8-teal: mat.get-color-from-palette(${projectName}-teal, 100);
            $color9-teal: mat.get-color-from-palette(${projectName}-teal, 50);
        
            $color0-green: mat.get-color-from-palette(${projectName}-green, 900);
            $color1-green: mat.get-color-from-palette(${projectName}-green, 800);
            $color2-green: mat.get-color-from-palette(${projectName}-green, 700);
            $color3-green: mat.get-color-from-palette(${projectName}-green, 600);
            $color4-green: mat.get-color-from-palette(${projectName}-green, 500);
            $color5-green: mat.get-color-from-palette(${projectName}-green, 400);
            $color6-green: mat.get-color-from-palette(${projectName}-green, 300);
            $color7-green: mat.get-color-from-palette(${projectName}-green, 200);
            $color8-green: mat.get-color-from-palette(${projectName}-green, 100);
            $color9-green: mat.get-color-from-palette(${projectName}-warn, 50);
        
            $color0-light-green: mat.get-color-from-palette(${projectName}-light-green, 900);
            $color1-light-green: mat.get-color-from-palette(${projectName}-light-green, 800);
            $color2-light-green: mat.get-color-from-palette(${projectName}-light-green, 700);
            $color3-light-green: mat.get-color-from-palette(${projectName}-light-green, 600);
            $color4-light-green: mat.get-color-from-palette(${projectName}-light-green, 500);
            $color5-light-green: mat.get-color-from-palette(${projectName}-light-green, 400);
            $color6-light-green: mat.get-color-from-palette(${projectName}-light-green, 300);
            $color7-light-green: mat.get-color-from-palette(${projectName}-light-green, 200);
            $color8-light-green: mat.get-color-from-palette(${projectName}-light-green, 100);
            $color9-light-green: mat.get-color-from-palette(${projectName}-light-green, 50);
        
            $color0-lime: mat.get-color-from-palette(${projectName}-lime, 900);
            $color1-lime: mat.get-color-from-palette(${projectName}-lime, 800);
            $color2-lime: mat.get-color-from-palette(${projectName}-lime, 700);
            $color3-lime: mat.get-color-from-palette(${projectName}-lime, 600);
            $color4-lime: mat.get-color-from-palette(${projectName}-lime, 500);
            $color5-lime: mat.get-color-from-palette(${projectName}-lime, 400);
            $color6-lime: mat.get-color-from-palette(${projectName}-lime, 300);
            $color7-lime: mat.get-color-from-palette(${projectName}-lime, 200);
            $color8-lime: mat.get-color-from-palette(${projectName}-lime, 100);
            $color9-lime: mat.get-color-from-palette(${projectName}-lime, 50);
        
            $color0-yellow: mat.get-color-from-palette(${projectName}-yellow, 900);
            $color1-yellow: mat.get-color-from-palette(${projectName}-yellow, 800);
            $color2-yellow: mat.get-color-from-palette(${projectName}-yellow, 700);
            $color3-yellow: mat.get-color-from-palette(${projectName}-yellow, 600);
            $color4-yellow: mat.get-color-from-palette(${projectName}-yellow, 500);
            $color5-yellow: mat.get-color-from-palette(${projectName}-yellow, 400);
            $color6-yellow: mat.get-color-from-palette(${projectName}-yellow, 300);
            $color7-yellow: mat.get-color-from-palette(${projectName}-yellow, 200);
            $color8-yellow: mat.get-color-from-palette(${projectName}-yellow, 100);
            $color9-yellow: mat.get-color-from-palette(${projectName}-yellow, 50);
        
            $color0-amber: mat.get-color-from-palette(${projectName}-amber, 900);
            $color1-amber: mat.get-color-from-palette(${projectName}-amber, 800);
            $color2-amber: mat.get-color-from-palette(${projectName}-amber, 700);
            $color3-amber: mat.get-color-from-palette(${projectName}-amber, 600);
            $color4-amber: mat.get-color-from-palette(${projectName}-amber, 500);
            $color5-amber: mat.get-color-from-palette(${projectName}-amber, 400);
            $color6-amber: mat.get-color-from-palette(${projectName}-amber, 300);
            $color7-amber: mat.get-color-from-palette(${projectName}-amber, 200);
            $color8-amber: mat.get-color-from-palette(${projectName}-amber, 100);
            $color9-amber: mat.get-color-from-palette(${projectName}-amber, 50);
        
            $color0-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 900);
            $color1-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 800);
            $color2-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 700);
            $color3-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 600);
            $color4-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 500);
            $color5-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 400);
            $color6-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 300);
            $color7-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 200);
            $color8-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 100);
            $color9-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 50);
        
            $color0-brown: mat.get-color-from-palette(${projectName}-brown, 900);
            $color1-brown: mat.get-color-from-palette(${projectName}-brown, 800);
            $color2-brown: mat.get-color-from-palette(${projectName}-brown, 700);
            $color3-brown: mat.get-color-from-palette(${projectName}-brown, 600);
            $color4-brown: mat.get-color-from-palette(${projectName}-brown, 500);
            $color5-brown: mat.get-color-from-palette(${projectName}-brown, 400);
            $color6-brown: mat.get-color-from-palette(${projectName}-brown, 300);
            $color7-brown: mat.get-color-from-palette(${projectName}-brown, 200);
            $color8-brown: mat.get-color-from-palette(${projectName}-brown, 100);
            $color9-brown: mat.get-color-from-palette(${projectName}-brown, 50);
        
            $color0-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 900);
            $color1-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 800);
            $color2-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 700);
            $color3-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 600);
            $color4-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 500);
            $color5-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 400);
            $color6-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 300);
            $color7-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 200);
            $color8-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 100);
            $color9-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 50);
        
            @import "./assets/styles/custom-theme";
        }
        
        .dark-theme {
            // Define the palettes for your theme using the Material Design palettes available in palette.scss
            // (imported above). For each palette, you can optionally specify a default, lighter, and darker
            // hue. Available color palettes: https://material.io/design/color/
            ${projectName}-primary: mat.define-palette(mat.$gray-palette);
            ${projectName}-accent: mat.define-palette(mat.$orange-palette);
        
            // The warn palette is optional (defaults to red).
            ${projectName}-warn: mat.define-palette(mat.$red-palette);
        
            // Extra color palettes
            ${projectName}-pink: mat.define-palette(mat.$pink-palette);
            ${projectName}-purple: mat.define-palette(mat.$purple-palette);
            ${projectName}-deep-purple: mat.define-palette(mat.$deep-purple-palette);
            ${projectName}-indigo: mat.define-palette(mat.$indigo-palette);
            ${projectName}-blue: mat.define-palette(mat.$blue-palette);
            ${projectName}-light-blue: mat.define-palette(mat.$light-blue-palette);
            ${projectName}-cyan: mat.define-palette(mat.$cyan-palette);
            ${projectName}-teal: mat.define-palette(mat.$teal-palette);
            ${projectName}-green: mat.define-palette(mat.$green-palette);
            ${projectName}-light-green: mat.define-palette(mat.$light-green-palette);
            ${projectName}-lime: mat.define-palette(mat.$lime-palette);
            ${projectName}-yellow: mat.define-palette(mat.$yellow-palette);
            ${projectName}-amber: mat.define-palette(mat.$amber-palette);
            ${projectName}-deep-orange: mat.define-palette(mat.$deep-orange-palette);
            ${projectName}-brown: mat.define-palette(mat.$brown-palette);
            ${projectName}-blue-gray: mat.define-palette(mat.$blue-gray-palette);
        
            // Create the theme object. A theme consists of configurations for individual
            // theming systems such as "color" or "typography".
            ${projectName}-theme: mat.define-dark-theme((color: (primary: ${projectName}-primary,
                            accent: ${projectName}-accent,
                            warn: ${projectName}-warn,
        
                            // Extra color palettes
                            pink: ${projectName}-pink,
                            purple: ${projectName}-purple,
                            deep-purple: ${projectName}-deep-purple,
                            blue: ${projectName}-blue,
                            light-blue: ${projectName}-light-blue,
                            indigo: ${projectName}-indigo,
                            cyan: ${projectName}-cyan,
                            teal: ${projectName}-teal,
                            green: ${projectName}-green,
                            light-green: ${projectName}-light-green,
                            lime: ${projectName}-lime,
                            yellow: ${projectName}-yellow,
                            amber: ${projectName}-amber,
                            deep-orange: ${projectName}-deep-orange,
                            brown: ${projectName}-brown,
                            blue-gray: ${projectName}-blue-gray,
                        )));
        
            // Include theme styles for core and each component used in your app.
            // Alternatively, you can import and @include the theme mixins for each component
            // that you are using.
            @include mat.all-component-themes(${projectName}-theme);
        
            $color0-primary: mat.get-color-from-palette(${projectName}-primary, 50);
            $color1-primary: mat.get-color-from-palette(${projectName}-primary, 100);
            $color2-primary: mat.get-color-from-palette(${projectName}-primary, 200);
            $color3-primary: mat.get-color-from-palette(${projectName}-primary, 300);
            $color4-primary: mat.get-color-from-palette(${projectName}-primary, 400);
            $color5-primary: mat.get-color-from-palette(${projectName}-primary, 500);
            $color6-primary: mat.get-color-from-palette(${projectName}-primary, 600);
            $color7-primary: mat.get-color-from-palette(${projectName}-primary, 700);
            $color8-primary: mat.get-color-from-palette(${projectName}-primary, 800);
            $color9-primary: mat.get-color-from-palette(${projectName}-primary, 900);
        
            $color0-accent: mat.get-color-from-palette(${projectName}-accent, 50);
            $color1-accent: mat.get-color-from-palette(${projectName}-accent, 100);
            $color2-accent: mat.get-color-from-palette(${projectName}-accent, 200);
            $color3-accent: mat.get-color-from-palette(${projectName}-accent, 300);
            $color4-accent: mat.get-color-from-palette(${projectName}-accent, 400);
            $color5-accent: mat.get-color-from-palette(${projectName}-accent, 500);
            $color6-accent: mat.get-color-from-palette(${projectName}-accent, 600);
            $color7-accent: mat.get-color-from-palette(${projectName}-accent, 700);
            $color8-accent: mat.get-color-from-palette(${projectName}-accent, 800);
            $color9-accent: mat.get-color-from-palette(${projectName}-accent, 900);
        
            $color0-warn: mat.get-color-from-palette(${projectName}-warn, 50);
            $color1-warn: mat.get-color-from-palette(${projectName}-warn, 100);
            $color2-warn: mat.get-color-from-palette(${projectName}-warn, 200);
            $color3-warn: mat.get-color-from-palette(${projectName}-warn, 300);
            $color4-warn: mat.get-color-from-palette(${projectName}-warn, 400);
            $color5-warn: mat.get-color-from-palette(${projectName}-warn, 500);
            $color6-warn: mat.get-color-from-palette(${projectName}-warn, 600);
            $color7-warn: mat.get-color-from-palette(${projectName}-warn, 700);
            $color8-warn: mat.get-color-from-palette(${projectName}-warn, 800);
            $color9-warn: mat.get-color-from-palette(${projectName}-warn, 900);
        
            // Start
            $color0-pink: mat.get-color-from-palette(${projectName}-pink, 50);
            $color1-pink: mat.get-color-from-palette(${projectName}-pink, 100);
            $color2-pink: mat.get-color-from-palette(${projectName}-pink, 200);
            $color3-pink: mat.get-color-from-palette(${projectName}-pink, 300);
            $color4-pink: mat.get-color-from-palette(${projectName}-pink, 400);
            $color5-pink: mat.get-color-from-palette(${projectName}-pink, 500);
            $color6-pink: mat.get-color-from-palette(${projectName}-pink, 600);
            $color7-pink: mat.get-color-from-palette(${projectName}-pink, 700);
            $color8-pink: mat.get-color-from-palette(${projectName}-pink, 800);
            $color9-pink: mat.get-color-from-palette(${projectName}-pink, 900);
        
            $color0-purple: mat.get-color-from-palette(${projectName}-purple, 50);
            $color1-purple: mat.get-color-from-palette(${projectName}-purple, 100);
            $color2-purple: mat.get-color-from-palette(${projectName}-purple, 200);
            $color3-purple: mat.get-color-from-palette(${projectName}-purple, 300);
            $color4-purple: mat.get-color-from-palette(${projectName}-purple, 400);
            $color5-purple: mat.get-color-from-palette(${projectName}-purple, 500);
            $color6-purple: mat.get-color-from-palette(${projectName}-purple, 600);
            $color7-purple: mat.get-color-from-palette(${projectName}-purple, 700);
            $color8-purple: mat.get-color-from-palette(${projectName}-purple, 800);
            $color9-purple: mat.get-color-from-palette(${projectName}-purple, 900);
        
            $color0-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 50);
            $color1-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 100);
            $color2-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 200);
            $color3-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 300);
            $color4-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 400);
            $color5-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 500);
            $color6-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 600);
            $color7-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 700);
            $color8-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 800);
            $color9-deep-purple: mat.get-color-from-palette(${projectName}-deep-purple, 900);
        
            $color0-blue: mat.get-color-from-palette(${projectName}-blue, 50);
            $color1-blue: mat.get-color-from-palette(${projectName}-blue, 100);
            $color2-blue: mat.get-color-from-palette(${projectName}-blue, 200);
            $color3-blue: mat.get-color-from-palette(${projectName}-blue, 300);
            $color4-blue: mat.get-color-from-palette(${projectName}-blue, 400);
            $color5-blue: mat.get-color-from-palette(${projectName}-blue, 500);
            $color6-blue: mat.get-color-from-palette(${projectName}-blue, 600);
            $color7-blue: mat.get-color-from-palette(${projectName}-blue, 700);
            $color8-blue: mat.get-color-from-palette(${projectName}-blue, 800);
            $color9-blue: mat.get-color-from-palette(${projectName}-blue, 900);
        
            $color0-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 50);
            $color1-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 100);
            $color2-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 200);
            $color3-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 300);
            $color4-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 400);
            $color5-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 500);
            $color6-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 600);
            $color7-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 700);
            $color8-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 800);
            $color9-light-blue: mat.get-color-from-palette(${projectName}-light-blue, 900);
        
            $color0-indigo: mat.get-color-from-palette(${projectName}-indigo, 50);
            $color1-indigo: mat.get-color-from-palette(${projectName}-indigo, 100);
            $color2-indigo: mat.get-color-from-palette(${projectName}-indigo, 200);
            $color3-indigo: mat.get-color-from-palette(${projectName}-indigo, 300);
            $color4-indigo: mat.get-color-from-palette(${projectName}-indigo, 400);
            $color5-indigo: mat.get-color-from-palette(${projectName}-indigo, 500);
            $color6-indigo: mat.get-color-from-palette(${projectName}-indigo, 600);
            $color7-indigo: mat.get-color-from-palette(${projectName}-indigo, 700);
            $color8-indigo: mat.get-color-from-palette(${projectName}-indigo, 800);
            $color9-indigo: mat.get-color-from-palette(${projectName}-indigo, 900);
        
            $color0-cyan: mat.get-color-from-palette(${projectName}-cyan, 50);
            $color1-cyan: mat.get-color-from-palette(${projectName}-cyan, 100);
            $color2-cyan: mat.get-color-from-palette(${projectName}-cyan, 200);
            $color3-cyan: mat.get-color-from-palette(${projectName}-cyan, 300);
            $color4-cyan: mat.get-color-from-palette(${projectName}-cyan, 400);
            $color5-cyan: mat.get-color-from-palette(${projectName}-cyan, 500);
            $color6-cyan: mat.get-color-from-palette(${projectName}-cyan, 600);
            $color7-cyan: mat.get-color-from-palette(${projectName}-cyan, 700);
            $color8-cyan: mat.get-color-from-palette(${projectName}-cyan, 800);
            $color9-cyan: mat.get-color-from-palette(${projectName}-cyan, 900);
        
            $color0-teal: mat.get-color-from-palette(${projectName}-teal, 50);
            $color1-teal: mat.get-color-from-palette(${projectName}-teal, 100);
            $color2-teal: mat.get-color-from-palette(${projectName}-teal, 200);
            $color3-teal: mat.get-color-from-palette(${projectName}-teal, 300);
            $color4-teal: mat.get-color-from-palette(${projectName}-teal, 400);
            $color5-teal: mat.get-color-from-palette(${projectName}-teal, 500);
            $color6-teal: mat.get-color-from-palette(${projectName}-teal, 600);
            $color7-teal: mat.get-color-from-palette(${projectName}-teal, 700);
            $color8-teal: mat.get-color-from-palette(${projectName}-teal, 800);
            $color9-teal: mat.get-color-from-palette(${projectName}-teal, 900);
        
            $color0-green: mat.get-color-from-palette(${projectName}-green, 50);
            $color1-green: mat.get-color-from-palette(${projectName}-green, 100);
            $color2-green: mat.get-color-from-palette(${projectName}-green, 200);
            $color3-green: mat.get-color-from-palette(${projectName}-green, 300);
            $color4-green: mat.get-color-from-palette(${projectName}-green, 400);
            $color5-green: mat.get-color-from-palette(${projectName}-green, 500);
            $color6-green: mat.get-color-from-palette(${projectName}-green, 600);
            $color7-green: mat.get-color-from-palette(${projectName}-green, 700);
            $color8-green: mat.get-color-from-palette(${projectName}-green, 800);
            $color9-green: mat.get-color-from-palette(${projectName}-green, 900);
        
            $color0-light-green: mat.get-color-from-palette(${projectName}-light-green, 50);
            $color1-light-green: mat.get-color-from-palette(${projectName}-light-green, 100);
            $color2-light-green: mat.get-color-from-palette(${projectName}-light-green, 200);
            $color3-light-green: mat.get-color-from-palette(${projectName}-light-green, 300);
            $color4-light-green: mat.get-color-from-palette(${projectName}-light-green, 400);
            $color5-light-green: mat.get-color-from-palette(${projectName}-light-green, 500);
            $color6-light-green: mat.get-color-from-palette(${projectName}-light-green, 600);
            $color7-light-green: mat.get-color-from-palette(${projectName}-light-green, 700);
            $color8-light-green: mat.get-color-from-palette(${projectName}-light-green, 800);
            $color9-light-green: mat.get-color-from-palette(${projectName}-light-green, 900);
        
            $color0-lime: mat.get-color-from-palette(${projectName}-lime, 50);
            $color1-lime: mat.get-color-from-palette(${projectName}-lime, 100);
            $color2-lime: mat.get-color-from-palette(${projectName}-lime, 200);
            $color3-lime: mat.get-color-from-palette(${projectName}-lime, 300);
            $color4-lime: mat.get-color-from-palette(${projectName}-lime, 400);
            $color5-lime: mat.get-color-from-palette(${projectName}-lime, 500);
            $color6-lime: mat.get-color-from-palette(${projectName}-lime, 600);
            $color7-lime: mat.get-color-from-palette(${projectName}-lime, 700);
            $color8-lime: mat.get-color-from-palette(${projectName}-lime, 800);
            $color9-lime: mat.get-color-from-palette(${projectName}-lime, 900);
        
            $color0-yellow: mat.get-color-from-palette(${projectName}-yellow, 50);
            $color1-yellow: mat.get-color-from-palette(${projectName}-yellow, 100);
            $color2-yellow: mat.get-color-from-palette(${projectName}-yellow, 200);
            $color3-yellow: mat.get-color-from-palette(${projectName}-yellow, 300);
            $color4-yellow: mat.get-color-from-palette(${projectName}-yellow, 400);
            $color5-yellow: mat.get-color-from-palette(${projectName}-yellow, 500);
            $color6-yellow: mat.get-color-from-palette(${projectName}-yellow, 600);
            $color7-yellow: mat.get-color-from-palette(${projectName}-yellow, 700);
            $color8-yellow: mat.get-color-from-palette(${projectName}-yellow, 800);
            $color9-yellow: mat.get-color-from-palette(${projectName}-yellow, 900);
        
            $color0-amber: mat.get-color-from-palette(${projectName}-amber, 50);
            $color1-amber: mat.get-color-from-palette(${projectName}-amber, 100);
            $color2-amber: mat.get-color-from-palette(${projectName}-amber, 200);
            $color3-amber: mat.get-color-from-palette(${projectName}-amber, 300);
            $color4-amber: mat.get-color-from-palette(${projectName}-amber, 400);
            $color5-amber: mat.get-color-from-palette(${projectName}-amber, 500);
            $color6-amber: mat.get-color-from-palette(${projectName}-amber, 600);
            $color7-amber: mat.get-color-from-palette(${projectName}-amber, 700);
            $color8-amber: mat.get-color-from-palette(${projectName}-amber, 800);
            $color9-amber: mat.get-color-from-palette(${projectName}-amber, 900);
        
            $color0-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 50);
            $color1-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 100);
            $color2-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 200);
            $color3-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 300);
            $color4-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 400);
            $color5-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 500);
            $color6-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 600);
            $color7-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 700);
            $color8-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 800);
            $color9-deep-orange: mat.get-color-from-palette(${projectName}-deep-orange, 900);
        
            $color0-brown: mat.get-color-from-palette(${projectName}-brown, 50);
            $color1-brown: mat.get-color-from-palette(${projectName}-brown, 100);
            $color2-brown: mat.get-color-from-palette(${projectName}-brown, 200);
            $color3-brown: mat.get-color-from-palette(${projectName}-brown, 300);
            $color4-brown: mat.get-color-from-palette(${projectName}-brown, 400);
            $color5-brown: mat.get-color-from-palette(${projectName}-brown, 500);
            $color6-brown: mat.get-color-from-palette(${projectName}-brown, 600);
            $color7-brown: mat.get-color-from-palette(${projectName}-brown, 700);
            $color8-brown: mat.get-color-from-palette(${projectName}-brown, 800);
            $color9-brown: mat.get-color-from-palette(${projectName}-brown, 900);
        
            $color0-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 50);
            $color1-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 100);
            $color2-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 200);
            $color3-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 300);
            $color4-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 400);
            $color5-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 500);
            $color6-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 600);
            $color7-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 700);
            $color8-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 800);
            $color9-blue-gray: mat.get-color-from-palette(${projectName}-blue-gray, 900);
        
            @import "./assets/styles/custom-theme";
        }
        
        /* You can add global styles to this file, and also import other style files */
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap');
        @import "./assets/styles/theme.scss";
        
        html,
        body {
            height: 100%;
        }
        
        body {
            margin: 0;
            font-family: 'Noto Sans', sans-serif !important;
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
        console.error(`Error running command: ${error}`);
        process.exit(1);
    }
}

runCommand(`${sudoCommand} ng new ${projectName} --routing --style=scss`, '.');
runCommand(`${sudoCommand} npm install bootstrap`, `./${projectName}`);
runCommand(`${sudoCommand} ng config "projects.${projectName}.architect.build.options.styles[1]" "./node_modules/bootstrap/dist/css/bootstrap.min.css"`, `./${projectName}`);
runCommand(`${sudoCommand} ng config "projects.${projectName}.architect.build.options.scripts[0]" "./node_modules/bootstrap/dist/js/bootstrap.min.js"`, `./${projectName}`);
runCommand(`${sudoCommand} ng add @angular/material --skip-confirmation --defaults --theme=custom --animations=enable`, `./${projectName}`);

runCommand(`${mkdir} animations`, `./${projectName}/src/app`);
runCommand(`${mkdir} buttons`, `./${projectName}/src/app`);
runCommand(`${mkdir} datasource`, `./${projectName}/src/app`);
runCommand(`${mkdir} home`, `./${projectName}/src/app/datasource`);
runCommand(`${mkdir} navigation`, `./${projectName}/src/app/datasource`);
runCommand(`${mkdir} directives`, `./${projectName}/src/app`);
runCommand(`${mkdir} interfaces`, `./${projectName}/src/app`);
runCommand(`${mkdir} modules`, `./${projectName}/src/app`);
runCommand(`${mkdir} navigations`, `./${projectName}/src/app`);
runCommand(`${mkdir} pages`, `./${projectName}/src/app`);
runCommand(`${mkdir} sections`, `./${projectName}/src/app`);
runCommand(`${mkdir} shared`, `./${projectName}/src/app`);
runCommand(`${mkdir} snackbars`, `./${projectName}/src/app`);
runCommand(`${mkdir} warnings`, `./${projectName}/src/app`);
runCommand(`${mkdir} apis`, `./${projectName}/src/app/shared`);
runCommand(`${mkdir} breakpoints`, `./${projectName}/src/app/shared`);
runCommand(`${mkdir} buttons`, `./${projectName}/src/app/shared`);
runCommand(`${mkdir} styles`, `./${projectName}/src/assets`);

runCommand(`${touch} custom-theme.scss`, `./${projectName}/src/assets/styles`);

runCommand(`${ng_generate_component} generic-button`, `./${projectName}/src/app/buttons`);  // Done
runCommand(`${ng_generate_component} generic-menu-button`, `./${projectName}/src/app/buttons`); // Done
runCommand(`${ng_generate_component} page-not-found`, `./${projectName}/src/app/pages`);  // Done
runCommand(`${ng_generate_component} ${projectName}`, `./${projectName}/src/app/pages`);
runCommand(`${ng_generate_module} ${projectName} --routing`, `./${projectName}/src/app/pages`);
runCommand(`${ng_generate_component} home`, `./${projectName}/src/app/pages`);
runCommand(`${ng_generate_component} about`, `./${projectName}/src/app/pages`);
runCommand(`${ng_generate_component} contact`, `./${projectName}/src/app/pages`);
runCommand(`${ng_generate_component} careers`, `./${projectName}/src/app/pages`);
runCommand(`${ng_generate_component} privacy-policy`, `./${projectName}/src/app/pages`);
runCommand(`${ng_generate_component} terms-and-conditions`, `./${projectName}/src/app/pages`);
runCommand(`${ng_generate_component} positive-snackbar`, `./${projectName}/src/app/snackbars`);  // Done
runCommand(`${ng_generate_component} negative-snackbar`, `./${projectName}/src/app/snackbars`);  // Done
runCommand(`${ng_generate_component} header`, `./${projectName}/src/app/navigations`);  // Done
runCommand(`${ng_generate_component} footer`, `./${projectName}/src/app/navigations`);  // Done
runCommand(`${ng_generate_component} site-under-development`, `./${projectName}/src/app/warnings`);
runCommand(`${ng_generate_module} material`, `./${projectName}/src/app/modules`);  // Done
runCommand(`${ng_generate_service} animations`, `./${projectName}/src/app/animations`);  // Done
runCommand(`${ng_generate_service} home-datasource`, `./${projectName}/src/app/datasource/home`);  // Done
runCommand(`${ng_generate_service} navigation-datasource`, `./${projectName}/src/app/datasource/navigation`);  // Done
runCommand(`${ng_generate_service} scroll-to-top`, `./${projectName}/src/app/shared/buttons`);  // Done

fs.writeFileSync(`./${projectName}/src/assets/styles/custom-theme.scss`, projectData.src.assets.styles.custom_theme_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/index.html`, projectData.src.index_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/styles.scss`, projectData.src.styles_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/app.component.html`, projectData.src.app.app_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/animations/animations.service.ts`, projectData.src.app.animations.animations_service_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/navigations/header/header.component.html`, projectData.src.app.navigations.header.header_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/navigations/header/header.component.scss`, projectData.src.app.navigations.header.header_component_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/navigations/header/header.component.ts`, projectData.src.app.navigations.header.header_component_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/navigations/footer/footer.component.html`, projectData.src.app.navigations.footer.footer_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/navigations/footer/footer.component.scss`, projectData.src.app.navigations.footer.footer_component_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/navigations/footer/footer.component.ts`, projectData.src.app.navigations.footer.footer_component_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/page-not-found/page-not-found.component.html`, projectData.src.app.pages.page_not_found.page_not_found_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/page-not-found/page-not-found.component.scss`, projectData.src.app.pages.page_not_found.page_not_found_component_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/home/home.component.html`, projectData.src.app.pages.home.home_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/home/home.component.scss`, projectData.src.app.pages.home.home_component_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/about/about.component.html`, projectData.src.app.pages.about.about_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/about/about.component.scss`, projectData.src.app.pages.about.about_component_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/contact/contact.component.html`, projectData.src.app.pages.contact.contact_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/contact/contact.component.scss`, projectData.src.app.pages.contact.contact_component_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/careers/careers.component.html`, projectData.src.app.pages.careers.careers_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/careers/careers.component.scss`, projectData.src.app.pages.careers.careers_component_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/privacy-policy/privacy-policy.component.html`, projectData.src.app.pages.privacy_policy.privacy_policy_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/privacy-policy/privacy-policy.component.scss`, projectData.src.app.pages.privacy_policy.privacy_policy_component_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/terms-and-conditions/terms-and-conditions.component.html`, projectData.src.app.pages.terms_and_conditions.terms_and_conditions_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/terms-and-conditions/terms-and-conditions.component.scss`, projectData.src.app.pages.terms_and_conditions.terms_and_conditions_component_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/${projectName}/${projectName.toLowerCase()}-routing.module.ts`, projectData.src.app.pages.projectName.projectName_routing_module_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/${projectName}/${projectName}.component.html`, projectData.src.app.pages.projectName.projectName_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/${projectName}/${projectName}.component.scss`, projectData.src.app.pages.projectName.projectName_component_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/pages/${projectName}/${projectName}.component.ts`, projectData.src.app.pages.projectName.projectName_component_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/buttons/generic-button/generic-button.component.html`, projectData.src.app.buttons.generic_button.generic_button_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/buttons/generic-button/generic-button.component.ts`, projectData.src.app.buttons.generic_button.generic_button_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/modules/material/material.module.ts`, projectData.src.app.modules.material.material_module_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/datasource/home/home-datasource.service.ts`, projectData.src.app.datasource.home.home_datasource_service_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/datasource/navigation/navigation-datasource.service.ts`, projectData.src.app.datasource.navigation.navigation_datasource_service_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/shared/buttons/scroll-to-top.service.ts`, projectData.src.app.shared.buttons.scroll_to_top_service_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/positive-snackbar/positive-snackbar.component.html`, projectData.src.app.snackbars.positive_snackbar.positive_snackbar_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/positive-snackbar/positive-snackbar.component.scss`, projectData.src.app.snackbars.positive_snackbar.positive_snackbar_component_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/positive-snackbar/positive-snackbar.component.ts`, projectData.src.app.snackbars.positive_snackbar.positive_snackbar_component_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/positive-snackbar/positive-snackbar.service.ts`, projectData.src.app.snackbars.positive_snackbar.positive_snackbar_service_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/negative-snackbar/negative-snackbar.component.html`, projectData.src.app.snackbars.negative_snackbar.negative_snackbar_component_html, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/negative-snackbar/negative-snackbar.component.scss`, projectData.src.app.snackbars.negative_snackbar.negative_snackbar_component_scss, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/negative-snackbar/negative-snackbar.component.ts`, projectData.src.app.snackbars.negative_snackbar.negative_snackbar_component_ts, `${utf8}`);
fs.writeFileSync(`./${projectName}/src/app/snackbars/negative-snackbar/negative-snackbar.service.ts`, projectData.src.app.snackbars.negative_snackbar.negative_snackbar_service_ts, `${utf8}`);

/**
 * USE THIS CODE TO INSERT CONTENT AT A SPECIFIC LINE IN THE FILE
 * const fs = require('fs');
 * const filePath = `./${projectName}/src/app/app.component.ts`;
 * const utf8 = 'utf-8';
 * // Read the existing file content
 * const existingContent = fs.readFileSync(filePath, utf8);
 * // Define the content you want to insert
 * const newContent = 'Your new content here\n';
 * // Specify the line number where you want to insert the content (e.g., line 5)
 * const lineNumber = 5;
 * // Split the existing content into an array of lines
 * const lines = existingContent.split('\n');
 * // Insert the new content at the specified line number
 * lines.splice(lineNumber - 1, 0, newContent);
 * // Join the lines back into a single string
 * const updatedContent = lines.join('\n');
 * // Write the updated content back to the file
 * fs.writeFileSync(filePath, updatedContent, utf8);
 */