Feature: Login
	In order to play games
	As a registered user
	I want to be able to login to my user account

	Scenario: Login page
		Given I open the homepage
		And click on login
		When I signin with twitter
		And click on account
		Then I should see the account page