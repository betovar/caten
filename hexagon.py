import math

class Hexagon():
	""" A class that generates point for hexagonal grids in a spiral
				   2-->3       1   2  
				  /     \       \ /   
				 1   0   4   6<--0-->3 
				  \     /       / \   
				   6<--5       5   4 	
	"""
	def __init__(self, rad):
		self.rad = rad 									#board radius
		self.r = rad/3. 								#piece radius
		self.c = self.r/2. 								#piece cosine
		self.s = self.r*math.sin(math.pi/3)				#piece sine
		self.circ = [( rad,rad*math.sin(math.pi/3) )] 	#first point

	def ew_1(self, (x,y) ):
		self.circ.append( (x-self.c,y-self.s) )

	def ew_2(self, (x,y) ):
		self.circ.append( (x+self.c,y-self.s) )

	def ew_3(self, (x,y) ):
		self.circ.append( (x+2*self.c,y) )

	def ew_4(self, (x,y) ):
		self.circ.append( (x+self.c,y+self.s) )

	def ew_5(self, (x,y) ):
		self.circ.append( (x-self.c,y+self.s) )

	def ew_6(self, (x,y) ):
		self.circ.append( (x-2*self.c,y) )

	def east_west(self, n):
		self.ew_6(*self.circ[-1:])
		for i in range(n-1):
			self.ew_1(*self.circ[-1:])
		for i in range(n):
			self.ew_2(*self.circ[-1:])
		for i in range(n):
			self.ew_3(*self.circ[-1:])
		for i in range(n):
			self.ew_4(*self.circ[-1:])
		for i in range(n):
			self.ew_5(*self.circ[-1:])
		for i in range(n):
			self.ew_6(*self.circ[-1:])

	def main(self):
		print 'circle locations:'
		self.east_west(1)
		self.east_west(2)
		self.circ.reverse()
		for i,c in enumerate(self.circ):
			print '<circle id="%c"' % chr(i+ord('A')),
			print 'cx="%.1f" cy="%.1f" r="30" />' % c
		print '</g>'
		print '<g id="numbers">'
		for i,c in enumerate(self.circ):
			print '<text id="%c"' % chr(i+ord('A')),
			print 'x="%.1f" y="%.1f"' % c,
			print '>%d</text>' % (i+1)
		print '\nresource points:'
		resources = []
		for i in self.circ:
			resources.append( north_south(i, self.r/math.sin(math.pi/3)/2) )
		for i,r in enumerate(resources):
			print '<polygon id="%c" class=""' % chr(i+ord('A'))
			print 'points="',
			for t in r:
				print '%.1f,%.1f' % t,
			print '" />'
		print ""

def north_south((x,y), r):
	local = []
	c = r/2.
	s = r*math.sin(math.pi/3.)
	local.append( (x+s,y+c) )
	local.append( (x,y+2*c) )
	local.append( (x-s,y+c) )
	local.append( (x-s,y-c) )
	local.append( (x,y-2*c) )
	local.append( (x+s,y-c) )
	return local

if __name__ == "__main__":
	import sys
	if len(sys.argv) == 1:
		h = Hexagon( 495.0 )
	elif len(sys.argv) == 2:
		h = Hexagon( float(sys.argv[1]) )
	else:
		print "Invalid syntax!"
	h.main()