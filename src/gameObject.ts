import { Camera } from "./camera";
import { Point } from "./point";
import { rectangleIntersect } from "./util";

// ALl game objects are rectangles, sue me
export abstract class GameObject {
  public pos: Point;
  public size: Point;
  protected type: number; // gameObjectTypes, I'd use and enum, but enums are bad in TypeSCript for some reason.

  constructor(x: number, y: number, w: number, h: number, type: number) {
    this.pos = new Point(x, y);
    this.size = new Point(w, h);
    this.type = type;
  }

  abstract update(dt: number): void;
  abstract render(ctx: CanvasRenderingContext2D, camera: Camera): void;

  collision(other: GameObject): void {
    if (rectangleIntersect(this.pos, this.size, other.pos, other.size)) {
      this.handleCollision(other.type);
      other.handleCollision(this.type);
    }
  }

  abstract handleCollision(otherType: number): void;
}
