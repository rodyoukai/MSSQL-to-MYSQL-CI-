<?php

class Traductor_bd_model extends CI_Model {

	function __construct()
	{
		parent::__construct();
		
	}
	
	// --------------------------------------------------------------------

      /** 
       * function SaveForm()
       *
       * insert form data
       * @param $form_data - array
       * @return Bool - TRUE or FALSE
       */

	function tabla_mssql($tabla)
	{
		$db_mssql = $this->load->database('mssql', TRUE);
        //y de esta forma accedemos, no con $this->db->get,
        //sino con $db_mssql->get que contiene la conexión
        //a la base de datos prueba
        $consulta = $db_mssql->get($tabla);
        return $consulta->result_array();
	}

		
	function guardar_mysql($tabla, $datos)
	{
		return $query = $this->db->insert($tabla,$datos);
									
	}

	function campos_tabla_mssql($tabla)
	{	
		$db_mssql = $this->load->database('mssql', TRUE);
        //y de esta forma accedemos, no con $this->db->get,
        //sino con $db_mssql->get que contiene la conexión
        //a la base de datos prueba			
		//$campos = $db_mssql->list_fields($tabla);
		$campos = $db_mssql->field_data($tabla);
		return $campos;		
	}



}


?>
