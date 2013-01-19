import math
from random import randint

DEFAULT_GRID_SIZE=100.

tokens = { # tokens have an associated payout number
	'B': 2,	
	'D': 3, 'Q': 3, 
	'J': 4, 'N': 4,	
	'A': 5,	'O': 5, 
	'C': 6, 'P': 6, 
	'E': 8,	'K': 8, 
	'G': 9, 'M': 9, 
	'F': 10, 'L': 10, 
	'I': 11, 'R': 11, 
	'H': 12 }

dots = {
	2: '.',
	3: '..',
	4: '...',
	5: '....',
	6: '.....',
	8: '.....',
	9: '....',
	10: '...',
	11: '..',
	12: '.' }

tiles = [ # a list of dictionaries, tiles --> board
	{ 'token': 'A', 'resource': 'quarry' },
	{ 'token': 'B', 'resource': 'fields' },
	{ 'token': 'C', 'resource': 'forest' },
	{ 'token': 'D', 'resource': 'quarry' },
	{ 'token': 'E', 'resource': 'fields' },
	{ 'token': 'F', 'resource': 'pasture' },
	{ 'token': 'G', 'resource': 'fields' },
	{ 'token': 'H', 'resource': 'pasture' },
	{ 'token': 'I', 'resource': 'forest' },
	{ 'token': 'J', 'resource': 'hills' },
	{ 'token': 'X', 'resource': 'desert' },
	{ 'token': 'K', 'resource': 'hills' },
	{ 'token': 'L', 'resource': 'pasture' },
	{ 'token': 'M', 'resource': 'pasture' },
	{ 'token': 'N', 'resource': 'forest' },
	{ 'token': 'O', 'resource': 'hills' },
	{ 'token': 'P', 'resource': 'quarry' },
	{ 'token': 'Q', 'resource': 'forest' },
	{ 'token': 'R', 'resource': 'fields' }
]

class Hexagon():
	""" A class that generates point for hexagonal grids in a spiral
				   3-->4       2   3  
				  /     \       \ /   
				 2   0   5   1<--0-->4 
				  \     /       / \   
				   1<--6       6   5 	
	"""
	def __init__(self, radius=DEFAULT_GRID_SIZE):
		self.r = radius											#piece radius
		self.g = radius*math.sin(math.pi/3.)*2. 				#grid distance
		self.circ = [( 0.,0. )]#first point

	def h1(self, t, r=DEFAULT_GRID_SIZE):
		x,y = t
		c = r/2.
		s = r*math.sin(math.pi/3.)
		return (x-2.*c,y)

	def h2(self, t, r=DEFAULT_GRID_SIZE):
		x,y = t
		c = r/2.
		s = r*math.sin(math.pi/3.)
		return (x-c,y-s)

	def h3(self, t, r=DEFAULT_GRID_SIZE):
		x,y = t
		c = r/2.
		s = r*math.sin(math.pi/3.)
		return (x+c,y-s)

	def h4(self, t, r=DEFAULT_GRID_SIZE):
		x,y = t
		c = r/2.
		s = r*math.sin(math.pi/3.)
		return (x+2.*c,y)

	def h5(self, t, r=DEFAULT_GRID_SIZE):
		x,y = t
		c = r/2.
		s = r*math.sin(math.pi/3.)
		return (x+c,y+s)

	def h6(self, t, r=DEFAULT_GRID_SIZE):
		x,y = t
		c = r/2.
		s = r*math.sin(math.pi/3.)
		return (x-c,y+s)

	def grid(self, n):
		self.circ.append( self.h1( self.circ[-1], self.g) )
		for i in range(n-1):
			self.circ.append( self.h2( self.circ[-1], self.g) )
		for i in range(n):
			self.circ.append( self.h3( self.circ[-1], self.g) )
		for i in range(n):
			self.circ.append( self.h4( self.circ[-1], self.g) )
		for i in range(n):
			self.circ.append( self.h5( self.circ[-1], self.g) )
		for i in range(n):
			self.circ.append( self.h6( self.circ[-1], self.g) )
		for i in range(n):
			self.circ.append( self.h1( self.circ[-1], self.g) )

	def main(self):
		print '<polygon id="ocean" transform="translate(%.1f,%.1f) rotate(30)"' % self.circ[0]
		print 'points="',
		for h in hex((0.,0.),self.r*5.5):
			print '%.1f,%.1f' % h,
		print '"/>'
		self.grid(1)
		self.grid(2)
		self.circ.reverse()
		nodes = []
		h = hex((0.,0.), self.r)
		print '<g id="tiles">'
		for i,c in enumerate(self.circ):
			t = tiles[i]
			print '<g class="tile"',
			print 'transform="translate(%.1f, %.1f)">' % c
			print '<polygon class="%s"' % t['resource']
			print 'points="',
			for p in h: #for point in hexagon, where c is center
				print '%.1f,%.1f' % p,
				nodes.append( (round(c[0]+p[0],1),round(c[1]+p[1],1)) )
			print '"/>'
			if (t['token'] != 'X'):
				print '<g id="%s" class="token">' % t['token']
				print '<circle cx="0" cy="0" r="30" />'
				print '<text x="0" y="-5"',
				if tokens[t['token']] in [6,8]:
					print 'style="stroke:maroon"',
				print '>%s</text>' % tokens[t['token']]
				print '<text x="0" y="5"',
				if tokens[t['token']] in [6,8]:
					print 'style="stroke:maroon"',
				print '>%s</text>' % dots[tokens[t['token']]]
				print '</g>'
			print '</g>'
		print '</g>'
		print '<g id="buildings">'
		nodes = list(set(nodes)) #remove duplicates
		for i,b in enumerate(nodes):
			print '<use id="%s" xlink:href="#settlement"' % i,
			print 'x="%.1f" y="%.1f" class="unowned" />' % b
		print '</g>'
		

def hex((x,y), r):
	local = []
	c = r/2.
	s = r*math.sin(math.pi/3.)
	local.append( (x+s,y+c) )
	local.append( (x,y+2.*c) )
	local.append( (x-s,y+c) )
	local.append( (x-s,y-c) )
	local.append( (x,y-2.*c) )
	local.append( (x+s,y-c) )
	return local

if __name__ == "__main__":
	import sys
	if len(sys.argv) == 1:
		h = Hexagon( )
	elif len(sys.argv) == 2:
		h = Hexagon( float(sys.argv[1]) )
	else:
		print "Invalid syntax!"
	h.main()