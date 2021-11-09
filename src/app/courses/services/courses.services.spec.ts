import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { COURSES } from "../../../../server/db-data";
import { CoursesService } from "./courses.service";

describe("CoursesService", () => {
  let coursesService: CoursesService;
  // http testing controller is used to mock http requests
  let httpTestingController: HttpTestingController;

  // beforeEach is a method that is run before each test is run
  beforeEach(() => {
    // condifureTestingModule is a method that is provided by the TestBed that allows us to configure the testing module
    TestBed.configureTestingModule({
      // HttpClientTestingModule is a module that provides the HttpClient service and some helpers.
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    coursesService = TestBed.inject<CoursesService>(CoursesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it("should retrive all courses", () => {
    coursesService.findAllCourses().subscribe((courses) => {
      // toBeTruthy is a matcher that checks if the value is truthy
      expect(courses).toBeTruthy("No courses returned");
      // second parameter is the error message in case the test fails
      expect(courses.length).toBe(12, "incorrect number of courses");

      const course = courses.find((course) => course.id === 12);
      expect(course.titles.description).toBe("Angular Testing Course");
    });
    // expectOne is a method that is provided by the HttpTestingController that allows us to assert that a single request has been made
    const req = httpTestingController.expectOne("/api/courses");
    // request.method is a method that returns the http method of the request
    expect(req.request.method).toEqual("GET");
    // flush is a method that is provided by the HttpTestingController that allows us to flush the request and return the response
    req.flush({ payload: Object.values(COURSES) });
  });
});
