Feature: Google for Cucumber
  In order to get more info about Cucumber
  As a BDDer
  I want to find Cucumber resources on Google

  @iShouldRunSuccesfully @becauseIAmHere
  Scenario: find xolv.io
    Given I am on Google
    When I search for "Chimp BDD"
    Then I see a link to "http://xolv.io/"

  #
  # The Below tests exist to show off the tags support
  # to check conditional look @ GruntFile.js, config->tags
  #

  @orIShouldRunSuccesfully @becauseIAmHere
  Scenario: Test Conditional Cucumber Tagging -- SHOULD RUN
    Given I am on Google

  #below should not run because it does not have "@iShouldRunSuccesfully" or "@orIShouldRunSuccesfully"
  @becauseIAmHere
  Scenario: Test Conditional Cucumber Tagging -- SHOULD NOT RUN
    Given I am on Google

  @iWontrun
  Scenario: Just a dead scenario -- SHOULD NOT RUN
    Given I am on Google

  # This should not run b/c it meets only the ~@iWontRun conditional
  Scenario: Just another dead scenario -- SHOULD NOT RUN
    Given I am on Google

