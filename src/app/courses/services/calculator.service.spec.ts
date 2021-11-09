import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

// describe is used to group together similar tests
describe("CalculatorSerivce", () => {
  let calculator: CalculatorService;
  let loggerSpy: any;

  // beforeEach is a Jasmine method that is called before each test is run.
  beforeEach(() => {
    console.log("Calling before each");
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);

    // TestBed is a helper class that allows us to configure the testing environment before each test is run.
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy },
      ],
    });
    //TestBed injects the CalculatorService into the variable calculator.
    calculator = TestBed.inject<CalculatorService>(CalculatorService);
  });

  // it is a Jasmine method that is used to define a test case.
  it("should add two numbers", () => {
    console.log("add test");
    const result = calculator.add(2, 2);
    // expect is a Jasmine method that is used to define the expected result of a test.
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  // it is a Jasmine method that is used to define a test case.
  it("should subtract two numbers", () => {
    console.log("subtract test");
    const result = calculator.subtract(3, 1);
    // expect is a Jasmine method that is used to define the expected result of a test.
    expect(result).toBe(2);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
