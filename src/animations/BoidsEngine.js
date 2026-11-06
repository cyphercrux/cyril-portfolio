/**
 * BOIDS FLOCKING ENGINE — FISH-SCHOOL SWARM ARCHITECTURE
 * Implementation based on Craig Reynolds' flocking principles with fish-school dynamics.
 * 
 * Behaviours implemented:
 * 1. SEPARATION: Maintain personal breathing room from neighbours.
 * 2. ALIGNMENT: Steer towards the average direction and velocity of neighbours.
 * 3. COHESION: Steer towards the local center of mass of the school.
 * 4. ORGANIC DYNAMICS: Fluid sine undulation, group split/merge cycles, and soft viewport bounds.
 */

export class Vector2D {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  mult(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }

  div(n) {
    if (n !== 0) {
      this.x /= n;
      this.y /= n;
    }
    return this;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  magSq() {
    return this.x * this.x + this.y * this.y;
  }

  heading() {
    return Math.atan2(this.y, this.x);
  }

  normalize() {
    const m = this.mag();
    if (m > 0) {
      this.div(m);
    }
    return this;
  }

  limit(max) {
    const mSq = this.magSq();
    if (mSq > max * max) {
      this.div(Math.sqrt(mSq));
      this.mult(max);
    }
    return this;
  }

  dist(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static dist(v1, v2) {
    return v1.dist(v2);
  }

  static sub(v1, v2) {
    return new Vector2D(v1.x - v2.x, v1.y - v2.y);
  }
}

export class BoidsEngine {
  constructor(config = {}) {
    this.perceptionRadius = config.perceptionRadius || 120;
    this.separationDistance = config.separationDistance || 55;
    
    // Base Weights
    this.separationWeight = config.separationWeight || 1.8;
    this.alignmentWeight = config.alignmentWeight || 1.1;
    this.cohesionWeight = config.cohesionWeight || 1.0;
    this.targetWeight = config.targetWeight || 0.6;
    this.boundaryWeight = config.boundaryWeight || 2.2;
    
    this.time = 0;
  }

  /**
   * Calculates flocking acceleration vector for a specific agent relative to all others.
   */
  computeFlockingForce(agent, allAgents, bounds, targetPoint = null) {
    this.time += 0.0005;

    // Organic School Dynamics: Oscillating split & merge cycle
    // When splitFactor is low, cohesion drops and separation rises -> group splits into smaller schools.
    // When splitFactor is high, cohesion dominates -> groups merge back.
    const splitFactor = Math.sin(this.time * 2.5);
    const dynamicCohesion = this.cohesionWeight * (0.8 + 0.5 * splitFactor);
    const dynamicSeparation = this.separationWeight * (1.0 + (splitFactor < 0 ? 0.4 : 0));

    const steerSeparation = this.computeSeparation(agent, allAgents, dynamicSeparation);
    const steerAlignment = this.computeAlignment(agent, allAgents);
    const steerCohesion = this.computeCohesion(agent, allAgents);
    const steerBoundaries = this.computeBoundaries(agent, bounds);

    const totalSteer = new Vector2D(0, 0);

    totalSteer.add(steerSeparation.mult(dynamicSeparation));
    totalSteer.add(steerAlignment.mult(this.alignmentWeight));
    totalSteer.add(steerCohesion.mult(dynamicCohesion));
    totalSteer.add(steerBoundaries.mult(this.boundaryWeight));

    // Optional subtle target attraction (e.g. Center of contact finale or user mouse)
    if (targetPoint) {
      const steerTarget = this.seek(agent, targetPoint);
      totalSteer.add(steerTarget.mult(this.targetWeight));
    }

    // Natural fish-tail swim undulation (perpendicular wave)
    const angle = agent.vel.heading();
    const undulation = Math.sin(this.time * 15 + agent.index * 1.5) * 0.12;
    const waveForce = new Vector2D(-Math.sin(angle) * undulation, Math.cos(angle) * undulation);
    totalSteer.add(waveForce);

    return totalSteer.limit(agent.maxForce || 0.2);
  }

  /**
   * RULE 1: SEPARATION
   * Steer away from neighbouring agents that are too close.
   */
  computeSeparation(agent, allAgents) {
    const steer = new Vector2D(0, 0);
    let count = 0;

    for (let i = 0; i < allAgents.length; i++) {
      const other = allAgents[i];
      if (other.id === agent.id) continue;

      const d = agent.pos.dist(other.pos);
      const desiredDist = agent.personalRadius || this.separationDistance;

      if (d > 0 && d < desiredDist) {
        // Inverse distance weighting: Closer neighbors produce much stronger repulsion
        const diff = Vector2D.sub(agent.pos, other.pos);
        diff.normalize();
        diff.div(d); // Stronger repulsion the closer they are
        steer.add(diff);
        count++;
      }
    }

    if (count > 0) {
      steer.div(count);
      if (steer.mag() > 0) {
        steer.normalize();
        steer.mult(agent.maxSpeed);
        steer.sub(agent.vel);
        steer.limit(agent.maxForce);
      }
    }

    return steer;
  }

  /**
   * RULE 2: ALIGNMENT
   * Steer towards the average velocity/direction of local flockmates.
   */
  computeAlignment(agent, allAgents) {
    const sumVel = new Vector2D(0, 0);
    let count = 0;

    for (let i = 0; i < allAgents.length; i++) {
      const other = allAgents[i];
      if (other.id === agent.id) continue;

      const d = agent.pos.dist(other.pos);
      if (d > 0 && d < this.perceptionRadius) {
        sumVel.add(other.vel);
        count++;
      }
    }

    if (count > 0) {
      sumVel.div(count);
      sumVel.normalize();
      sumVel.mult(agent.maxSpeed);
      const steer = Vector2D.sub(sumVel, agent.vel);
      steer.limit(agent.maxForce);
      return steer;
    }

    return new Vector2D(0, 0);
  }

  /**
   * RULE 3: COHESION
   * Steer towards the center of mass of local flockmates.
   */
  computeCohesion(agent, allAgents) {
    const sumPos = new Vector2D(0, 0);
    let count = 0;

    for (let i = 0; i < allAgents.length; i++) {
      const other = allAgents[i];
      if (other.id === agent.id) continue;

      const d = agent.pos.dist(other.pos);
      if (d > 0 && d < this.perceptionRadius) {
        sumPos.add(other.pos);
        count++;
      }
    }

    if (count > 0) {
      sumPos.div(count);
      return this.seek(agent, sumPos);
    }

    return new Vector2D(0, 0);
  }

  /**
   * Seek behavior: calculate steering vector towards a target position with smooth arrival.
   */
  seek(agent, target) {
    const desired = Vector2D.sub(target, agent.pos);
    const d = desired.mag();

    if (d > 0) {
      desired.normalize();
      // Smooth deceleration within 100px
      if (d < 100) {
        desired.mult(agent.maxSpeed * (d / 100));
      } else {
        desired.mult(agent.maxSpeed);
      }
      const steer = Vector2D.sub(desired, agent.vel);
      steer.limit(agent.maxForce);
      return steer;
    }

    return new Vector2D(0, 0);
  }

  /**
   * Soft boundary steering: gracefully curves agents away from screen borders.
   */
  computeBoundaries(agent, bounds) {
    const steer = new Vector2D(0, 0);
    const padding = 60;

    if (agent.pos.x < padding) {
      steer.x = agent.maxSpeed * ((padding - agent.pos.x) / padding);
    } else if (agent.pos.x > bounds.width - padding) {
      steer.x = -agent.maxSpeed * ((agent.pos.x - (bounds.width - padding)) / padding);
    }

    if (agent.pos.y < padding) {
      steer.y = agent.maxSpeed * ((padding - agent.pos.y) / padding);
    } else if (agent.pos.y > bounds.height - padding) {
      steer.y = -agent.maxSpeed * ((agent.pos.y - (bounds.height - padding)) / padding);
    }

    return steer;
  }
}

