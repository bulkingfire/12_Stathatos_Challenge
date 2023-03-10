SELECT r.title, e.id, e.role.id, d.tr_name AS department, r.salary
FROM role
INNER JOIN department ON r.department_id = d.id
