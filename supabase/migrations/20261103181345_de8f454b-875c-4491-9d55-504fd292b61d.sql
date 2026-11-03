INSERT INTO public.school_invites (school_id, email, role, classroom_ids)
SELECT 'a091e088-b70a-4a83-b006-5ae34de2300c', 'luisacaso@virgilio.it', 'teacher',
  ARRAY(SELECT id FROM public.classrooms WHERE school_id = 'a091e088-b70a-4a83-b006-5ae34de2300c')
WHERE NOT EXISTS (SELECT 1 FROM public.school_invites WHERE lower(email)='luisacaso@virgilio.it' AND school_id='a091e088-b70a-4a83-b006-5ae34de2300c');