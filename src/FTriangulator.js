/*  Firmament HTML 5 Game Engine
    Copyright (C) 2011 Jordan CM Wambaugh jordan@wambaugh.org http://firmament.wambaugh.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.  
 */
/**
 * 
 */



var FTriangulator={
		EPSILON:0.0000000001
		,area :function(contour)
		{
			var n = contour.length;
			var A=0.0;
			var p=n-1;
			for(var q=0; q<n; p=q++)
			{
				A+= contour[p].x*contour[q].y - contour[q].x*contour[p].y;
			}
			return A*0.5;
		}


		/**
		 * decides if a povar P is Inside of the triangle
		 * defined by A, B, C.
		 */
		,insideTriangle:function(Ax,Ay,
								Bx, By,
								Cx, Cy,
								Px, Py){
			var ax, ay, bx, by, cx, cy, apx, apy, bpx, bpy, cpx, cpy;
			var cCROSSap, bCROSScp, aCROSSbp;
			
			ax = Cx - Bx;  ay = Cy - By;
			bx = Ax - Cx;  by = Ay - Cy;
			cx = Bx - Ax;  cy = By - Ay;
			apx= Px - Ax;  apy= Py - Ay;
			bpx= Px - Bx;  bpy= Py - By;
			cpx= Px - Cx;  cpy= Py - Cy;
			
			aCROSSbp = ax*bpy - ay*bpx;
			cCROSSap = cx*apy - cy*apx;
			bCROSScp = bx*cpy - by*cpx;
			
			return ((aCROSSbp >= 0.0) && (bCROSScp >= 0.0) && (cCROSSap >= 0.0));
		}
		
		
		,snip:function (contour, u, v, w, n,V)
		{
			  var p;
			  var Ax, Ay, Bx, By, Cx, Cy, Px, Py;

			  Ax = contour[V[u]].x;
			  Ay = contour[V[u]].y;

			  Bx = contour[V[v]].x;
			  By = contour[V[v]].y;

			  Cx = contour[V[w]].x;
			  Cy = contour[V[w]].y;

			  if ( this.EPSILON > (((Bx-Ax)*(Cy-Ay)) - ((By-Ay)*(Cx-Ax))) ) return false;

			  for (p=0;p<n;p++)
			  {
			    if( (p == u) || (p == v) || (p == w) ) continue;
			    Px = contour[V[p]].x;
			    Py = contour[V[p]].y;
			    if (this.insideTriangle(Ax,Ay,Bx,By,Cx,Cy,Px,Py)) return false;
			  }

			  return true;
			}
		,process:function(contour,result)
		{
			  /* allocate and initialize list of Vertices in polygon */

			  var n = contour.length;
			  if ( n < 3 ) return false;

			  var V = new Array();

			  /* we want a counter-clockwise polygon in V */

			  if ( 0.0 < this.area(contour) )
			    for (var v=0; v<n; v++) V[v] = v;
			  else
			    for(var v=0; v<n; v++) V[v] = (n-1)-v;

			  var nv = n;

			  /*  remove nv-2 Vertices, creating 1 triangle every time */
			  var count = 2*nv;   /* error detection */

			  for(var m=0, v=nv-1; nv>2; )
			  {
			    /* if we loop, it is probably a non-simple polygon */
			    if (0 >= (count--))
			    {
			      //** Triangulate: ERROR - probable bad polygon!
			      return false;
			    }

			    /* three consecutive vertices in current polygon, <u,v,w> */
			    var u = v  ; if (nv <= u) u = 0;     /* previous */
			    v = u+1; if (nv <= v) v = 0;     /* new v    */
			    var w = v+1; if (nv <= w) w = 0;     /* next     */

			    if ( this.snip(contour,u,v,w,nv,V) )
			    {
			      var a,b,c,s,t;

			      /* true names of the vertices */
			      a = V[u]; b = V[v]; c = V[w];

			      /* output Triangle */
			      result.push( contour[a] );
			      result.push( contour[b] );
			      result.push( contour[c] );

			      m++;

			      /* remove v from remaining polygon */
			      for(s=v,t=v+1;t<nv;s++,t++) V[s] = V[t]; nv--;

			      /* resest error detection counter */
			      count = 2*nv;
			    }
			  }



			  //delete V;

			  return true;
			}
		
		,getTriangles:function(shape){
			var res=[],triangles=[];
			if(!this.process(shape, res)){
				return false;
			}
			var triangleCount = res.length/3;
			for(var x=0;x<triangleCount;x++){
				triangles.push(
				[
				 res[x*3]
				 ,res[x*3+1]
				 ,res[x*3+2]
				 ]		
				)
			}
			return triangles;
		}
		
		
};
