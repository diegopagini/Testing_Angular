import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { setupCourses } from "../common/setup-test-data";
import { CoursesModule } from "../courses.module";
import { CoursesCardListComponent } from "./courses-card-list.component";

// Presentational component tests
describe("CoursesCardListComponent", () => {
  // Create a instance of the component
  let component: CoursesCardListComponent;
  // Create a instance of the component fixture
  let fixture: ComponentFixture<CoursesCardListComponent>;
  // Create a instance of the debug element
  let el: DebugElement;

  beforeEach(
    // waitForAsync() is used to wait for the async tasks to complete, can't use async/await
    waitForAsync(() => {
      TestBed.configureTestingModule({
        // Imports the module ho has all the component we want to test and directives on it
        imports: [CoursesModule],
      })
        .compileComponents() // compile template and css asynchronously
        // Is no need to use awit, because we are not using async/await
        .then(() => {
          // Create the component instance and initialize it with the fixture before each test
          fixture = TestBed.createComponent(CoursesCardListComponent);
          component = fixture.componentInstance;
          el = fixture.debugElement;
        });
    })
  );

  it("should create the component", () => {
    // Assert that the component is created
    expect(component).toBeTruthy();
  });

  // DOM interactions
  it("should display the course list", () => {
    component.courses = setupCourses(); // Set the courses from DB.

    fixture.detectChanges(); // Trigger the change detection

    console.log(el.nativeElement.outerHTML); // This way is use to debug the html

    const cards = el.queryAll(By.css(".course-card")); // Get all elements with the class course-card
    // Expect that exist at least one course card
    expect(cards).toBeTruthy("Could not find cards");
    // Expect that the number of cards is equal to 12
    expect(cards.length).toBe(12, "Unexpected number of courses");
  });

  it("should display the first course", () => {
    pending();
  });
});
