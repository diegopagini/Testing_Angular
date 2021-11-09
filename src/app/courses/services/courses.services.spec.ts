import { HttpErrorResponse } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { COURSES, findLessonsForCourse } from "../../../../server/db-data";
import { Course } from "../model/course";
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

  it("should find a course by id", () => {
    coursesService.findCourseById(12).subscribe((course) => {
      expect(course).toBeTruthy("No course returned");
      expect(course.id).toBe(12);
    });

    const req = httpTestingController.expectOne("/api/courses/12");
    expect(req.request.method).toEqual("GET");
    req.flush(COURSES[12]);
  });

  it("should save the course data", () => {
    const changes: Partial<Course> = {
      titles: { description: "Testing Course" },
    };
    // Testing put method of http save coursesService
    coursesService.saveCourse(12, changes).subscribe((course) => {
      // expected to be true
      expect(course.id).toBe(12);
    });

    const req = httpTestingController.expectOne("/api/courses/12");
    expect(req.request.method).toEqual("PUT");
    expect(req.request.body.titles.description).toEqual("Testing Course");
    req.flush({
      ...COURSES[12],
      ...changes,
    });
  });

  it("should give an error if save course fails", () => {
    const changes: Partial<Course> = {
      titles: { description: "Testing Course" },
    };
    coursesService.saveCourse(12, changes).subscribe(
      () =>
        // fail the test is used to fail the test but expect a success
        fail("the save course operation should have failed"),
      (error: HttpErrorResponse) => {
        // 500 is the http status code for internal server error
        expect(error.status).toBe(500);
      }
    );

    // Always expect a request to be made
    const req = httpTestingController.expectOne("/api/courses/12");
    expect(req.request.method).toEqual("PUT");
    req.flush("Save course failed", {
      status: 500,
      statusText: "Internal Server Error",
    });
  });

  it("should find a list of lessons", () => {
    coursesService.findLessons(12).subscribe((lessons) => {
      // expect to be true
      expect(lessons).toBeTruthy("No lessons returned");
      // the pageSize is set to 3
      expect(lessons.length).toBe(3, "incorrect number of lessons");
    });
    // check if the request url is correct
    const req = httpTestingController.expectOne(
      (req) => req.url == "/api/lessons"
    );
    // expect the request method to be get
    expect(req.request.method).toEqual("GET");
    // param courseId is set to 12
    expect(req.request.params.get("courseId")).toEqual("12");
    // param filter is an empty string
    expect(req.request.params.get("filter")).toEqual("");
    // param sortOrder is set to "asc"
    expect(req.request.params.get("sortOrder")).toEqual("asc");
    // param pageSize is set to 3
    expect(req.request.params.get("pageSize")).toEqual("3");

    req.flush({
      payload: findLessonsForCourse(12).slice(0, 3),
    });
  });

  // afterEach is a method that is run after each test is run
  afterEach(() => {
    // verify that there are no outstanding requests
    httpTestingController.verify();
  });
});
