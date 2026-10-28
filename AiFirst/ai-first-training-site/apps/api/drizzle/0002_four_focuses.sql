-- The product/design focus is now shared by the group, with QA coordinating acceptance criteria.
-- Keep existing rosters valid by moving those assignments to the closest remaining focus.
UPDATE group_members SET role = 'qa' WHERE role = 'product';
