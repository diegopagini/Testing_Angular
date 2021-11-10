import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AboutComponent } from "./about.component";

describe("AboutComponent", () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AboutComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a title", () => {
    const title = fixture.nativeElement.querySelector("h1");

    expect(title.textContent).toEqual("Welcome!");
  });

  it("should have a img", () => {
    const img = fixture.nativeElement.querySelector("img");

    expect(img.src).toBeTruthy();
  });
});
