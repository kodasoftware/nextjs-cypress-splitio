Feature: Split

  I want to use split to turn features on and off

  @feature_enabled
  Scenario: Feature is toggled on
    Given I have a device ID of "chris"
    When I navigate to the homepage
    Then the feature is toggled "on"

  @feature_disabled
  Scenario: Feature is toggled off
    Given I do not have a device ID
    When I navigate to the homepage
    Then the feature is toggled "off"

  @split_powered
  Scenario: Feature is evaluated in Cypress
    Given I have a device ID of "foobar"
    Then I can see