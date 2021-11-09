import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { setupCourses } from "../common/setup-test-data";
import { CoursesModule } from "../courses.module";
import { CoursesService } from "../services/courses.service";
import { HomeComponent } from "./home.component";

// Smart or Container components
describe("HomeComponent", () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: any;
  const beginnerCourses = setupCourses().filter(
    (course) => course.category === "BEGINNER"
  );
  const advancedCourses = setupCourses().filter(
    (course) => course.category === "ADVANCED"
  );

  beforeEach(
    waitForAsync(() => {
      const coursesServiceSpy = jasmine.createSpyObj("CoursesService", [
        "findAllCourses",
      ]);

      TestBed.configureTestingModule({
        imports: [CoursesModule, NoopAnimationsModule],
        providers: [
          {
            provide: CoursesService,
            useValue: coursesServiceSpy,
          },
        ],
      })
        .compileComponents()
        .then(() => {
          // Assign the component to local variable
          fixture = TestBed.createComponent(HomeComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
          coursesService = TestBed.inject<CoursesService>(CoursesService);
        });
    })
  );

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("should display only beginner courses", () => {
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));
    // detectChanges() is necessary to update the view
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));
    // Expect to see only one tab
    expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });

  it("should display only advanced courses", () => {
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));
    // detectChanges() is necessary to update the view
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));
    // Expect to see only one tab
    expect(tabs.length).toBe(1, "Unexpected number of tabs found");
  });

  it("should display only both tabs", () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    // detectChanges() is necessary to update the view
    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));
    // Expect to see two tabs
    expect(tabs.length).toBe(2, "Unexpected number of tabs found");
  });

  // ASYNC TEST
  it("should display advanced courses wheb tab clicked", (done: DoneFn) => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css(".mat-tab-label"));

    tabs[1].nativeElement.click();

    fixture.detectChanges();

    setTimeout(() => {
      const cardTitles = el.queryAll(
        By.css(".mat-tab-body-active .mat-card-title")
      ); // Expect to see more than 0 cards
      expect(cardTitles.length).toBeGreaterThan(
        0,
        "Unexpected number of courses found"
      );

      // Expect to se the first card to be an advanced course called "Angular Security Course"
      expect(cardTitles[0].nativeElement.textContent).toContain(
        "Angular Security Course"
      );
      // done() is necessary to tell Jasmine that the test is done
      done();
    }, 500);
  });
});
