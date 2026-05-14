
# Simulador de calor sensível e latente

![Local Image](./assets/example.png)

Pode ser acessado [clicando este link](https://mpcardonix.github.io/simulador-fisica/)

## Contém:

- Gráfico customizável que demonstra a quantidade de calor em relação a temperatura
-  Explicações didáticas acerca do conteúdo relacionado
- Customização de materiais a serem representados no gráfico
```
class MaterialGraph(){
	name="Água"
	tFusao = 0
	tEbulicao = 100
	mass = 0
	calor_especifico = 0
	calor_latente = 0
	color = this.getRandomColor()
}
```

OBS: O calor latente é usado apenas um valor a fins didáticos. Em um cenário real, a substância teria diferentes valores de calor latente conforme o processo pelo qual está passando. O mesmo também se aplica ao calor específico.
  

## Ideias que podem ser implementadas em futuras atualizações:

- Validação para temperatura Kelvin não ter valor negativo
- Preencher incógnita? talvez