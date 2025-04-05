# Memorizador de Tabelas-Verdade - README

## Visão Geral do Projeto

O Memorizador de Tabelas-Verdade é uma aplicação web interativa para estudo e prática de operadores lógicos fundamentais através de:

1. Visualização completa das tabelas-verdade
2. Exercícios interativos de preenchimento
3. Testes rápidos com sistema de pontuação
4. Técnicas mnemônicas para memorização

## Fundamentos Lógicos Implementados

### Operadores Lógicos Abordados:
- **NEGAÇÃO (¬)**: Inversão de valores lógicos
- **CONJUNÇÃO (∧)**: Operador "E" lógico
- **DISJUNÇÃO (∨)**: Operador "OU" inclusivo
- **CONDICIONAL (→)**: Implicação lógica
- **BICONDICIONAL (↔)**: Equivalência lógica
- **OU EXCLUSIVO (⊕)**: Disjunção exclusiva

Cada operador é apresentado com:
- Tabela-verdade completa
- Macetes de memorização
- Exemplos de aplicação
- Padrões de identificação

## Tecnologias Utilizadas

### Frontend
- **HTML5 Semântico**: Estrutura organizada em seções lógicas
- **CSS3 Moderno**:
  - Variáveis CSS para consistência visual
  - Flexbox e Grid para layouts responsivos
  - Media queries para adaptação a dispositivos
- **JavaScript (ES6+)**:
  - Geração dinâmica de tabelas
  - Lógica de verificação de respostas
  - Sistema de pontuação e progresso

### Técnicas Avançadas
1. **Renderização Dinâmica**:
```javascript
function generateTruthTable(operator) {
  // Gera tabelas HTML dinamicamente
  // com base nas definições lógicas
}
```

2. **Gerenciamento de Estado**:
```javascript
const appState = {
  currentMode: 'tables',
  score: 0,
  currentExercise: null
};
```

3. **Feedback Interativo**:
- Colorização de células corretas/incorretas
- Explicações contextualizadas
- Dicas progressivas

## Funcionalidades Principais

### 1. Modo Teoria
- Visualização completa de todas as tabelas
- Explicações sobre cada operador
- Macetes visuais para memorização

### 2. Modo Prática
- Geração aleatória de exercícios
- Preenchimento interativo de tabelas
- Verificação instantânea de respostas

### 3. Modo Quiz
- Questões objetivas sobre casos específicos
- Sistema de pontuação com histórico
- Feedback explicativo após cada resposta

## Casos de Uso

1. **Para Estudantes**:
   - Aprender operadores lógicos básicos
   - Preparar-se para provas e exames
   - Fixar conteúdo através da prática

2. **Para Professores**:
   - Recurso didático para aulas
   - Gerador de exercícios práticos
   - Ferramenta de avaliação formativa

3. **Autodidatas**:
   - Introdução à lógica proposicional
   - Verificação instantânea de aprendizagem
   - Revisão eficiente de conceitos

## Estrutura do Projeto

```
tabelas-verdade/
├── index.html        # Estrutura principal
├── styles.css        # Estilos e layout
└── script.js         # Lógica da aplicação
```

## Como Executar

1. Clone o repositório ou faça download dos arquivos
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Não requer instalação ou dependências externas

## Diferenciais Pedagógicos

- **Abordagem Multimodal**: Visual, prática e teórica
- **Feedback Imediato**: Correção automática com explicações
- **Gamificação**: Sistema de pontuação motivador
- **Portabilidade**: Funciona offline após baixado
