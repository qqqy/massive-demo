select incidents.id, state, injuries.name, affectedareas.name from incidents
join injuries on incidents.injuryid = injuries.id
join affectedareas on affectedareas.id = injuries.affectedareaid
join causes on causes.id = incidents.causeid