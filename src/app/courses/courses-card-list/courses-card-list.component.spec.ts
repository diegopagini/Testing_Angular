import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { CoursesModule } from "../courses.module";
import { CoursesCardListComponent } from "./courses-card-list.component";

// Presentational component tests
describe("CoursesCardListComponent", () => {
  // Create a instance of the component
  let component: CoursesCardListComponent;
  // Create a instance of the component fixture
  let fixture: ComponentFixture<CoursesCardListComponent>;

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
        });
    })
  );

  it("should create the component", () => {
    // Assert that the component is created
    expect(component).toBeTruthy();
  });

  it("should display the course list", () => {
    pending();
  });

  it("should display the first course", () => {
    pending();
  });
});
