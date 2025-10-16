import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CodeBlock from "@/components/CodeBlock";
import Section from "@/components/Section";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";

import diagramProblem from "@/assets/diagram-problem.png";
import diagramBefore from "@/assets/diagram-before.png";
import diagramAfter from "@/assets/diagram-after.png";
import diagramImplementation from "@/assets/diagram-implementation.png";

const Index = () => {
  const problemCode = `class NewsAgency
{
    private string _news;
    private NewsChannel _channel;
    
    public NewsAgency(NewsChannel channel)
    {
        _channel = channel;
    }
    
    public void SetNews(string news)
    {
        _news = news;
        _channel.Update(news);
    }
}

class NewsChannel
{
    private string _news;
    
    public void Update(string news)
    {
        _news = news;
        Console.WriteLine($"[Canal] Nova notícia: {_news}");
    }
}`;

  const solutionCode = `using System;
using System.Collections.Generic;

// Interface Observer
interface IObserver
{
    void Update(string news);
}

// Interface Subject
interface ISubject
{
    void Attach(IObserver observer);
    void Detach(IObserver observer);
    void Notify();
}

// Concrete Subject
class NewsAgency : ISubject
{
    private List<IObserver> _observers = new List<IObserver>();
    private string _latestNews;
    
    public void Attach(IObserver observer)
    {
        _observers.Add(observer);
    }
    
    public void Detach(IObserver observer)
    {
        _observers.Remove(observer);
    }
    
    public void SetNews(string news)
    {
        _latestNews = news;
        Notify();
    }
    
    public void Notify()
    {
        foreach (var observer in _observers)
        {
            observer.Update(_latestNews);
        }
    }
}

// Concrete Observers
class NewsChannel : IObserver
{
    private string _name;
    
    public NewsChannel(string name)
    {
        _name = name;
    }
    
    public void Update(string news)
    {
        Console.WriteLine($"[{_name}] Nova notícia: {news}");
    }
}

// Programa principal
class Program
{
    static void Main(string[] args)
    {
        var agency = new NewsAgency();
        var channel1 = new NewsChannel("Canal 1");
        var channel2 = new NewsChannel("Canal 2");
        
        agency.Attach(channel1);
        agency.Attach(channel2);
        
        agency.SetNews("Novas eleições anunciadas!");
        agency.SetNews("Descoberto novo planeta!");
    }
}`;

  const outputCode = `[Canal 1] Nova notícia: Novas eleições anunciadas!
[Canal 2] Nova notícia: Novas eleições anunciadas!
[Canal 1] Nova notícia: Descoberto novo planeta!
[Canal 2] Nova notícia: Descoberto novo planeta!`;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-glow to-accent py-24 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg4djNoLTh6bTAgMThoOHYzaC04ek0yMCAxMzRoOHYzaC04em0wIDE4aDh2M2gtOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">Observer Pattern</h1>
          <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Samuel Maciel dos Santos e Laura Gabriele Teixeira
          </p>
          <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Design Pattern comportamental que define uma dependência um-para-muitos entre objetos
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              onClick={() => scrollToSection("problema")}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-lg"
            >
              Começar <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={() => scrollToSection("implementacao")}
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
            >
              Ver Código
            </Button>
          </div>
        </div>
      </header>

      {/* Problema Section */}
      <Section id="problema" title="1. Problema">
        <div className="space-y-8">
          <div className="text-lg text-foreground leading-relaxed space-y-4">
            <p>
              Em muitos sistemas orientados a objetos, há situações em que um objeto precisa notificar 
              automaticamente outros objetos sobre mudanças em seu estado. Por exemplo:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Um aplicativo de notícias precisa avisar automaticamente os assinantes quando uma nova 
                notícia é publicada.
              </li>
              <li>
                Um sistema de estoque deve atualizar automaticamente todas as telas conectadas quando a 
                quantidade de um produto muda.
              </li>
            </ul>
            <p>
              Sem um padrão, você teria que criar referências diretas entre o objeto principal (o sujeito) 
              e todos os objetos dependentes (observadores), o que gera forte acoplamento e dificulta a 
              manutenção.
            </p>
          </div>
          
          <img 
            src={diagramProblem} 
            alt="Diagrama do problema" 
            className="w-full max-w-2xl mx-auto rounded-xl shadow-card"
          />
        </div>
      </Section>

      {/* Exemplo do Problema Section */}
      <Section id="exemplo-problema" title="2. Exemplo do problema" variant="gradient">
        <div className="space-y-6">
          <p className="text-lg text-foreground leading-relaxed">
            Sem o Observer Pattern:
          </p>
          
          <CodeBlock code={problemCode} title="Código sem o padrão" />
          
          <Card className="p-6 bg-destructive/10 border-destructive/30">
            <div className="flex items-start gap-3">
              <XCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-destructive mb-2">Problema:</h4>
                <p className="text-foreground">
                  O <code className="bg-muted px-2 py-1 rounded text-sm">NewsAgency</code> está 
                  diretamente acoplado ao <code className="bg-muted px-2 py-1 rounded text-sm">NewsChannel</code>. 
                  Se quisermos notificar vários canais ou outros tipos de observadores (por exemplo, um aplicativo 
                  mobile), precisamos modificar o código do NewsAgency, quebrando o princípio Open/Closed.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Solução Section */}
      <Section id="solucao" title="3. Solução proposta pelo padrão">
        <div className="space-y-8">
          <div className="text-lg text-foreground leading-relaxed space-y-4">
            <p>
              O Observer Pattern define uma relação um-para-muitos entre objetos, de forma que quando um 
              objeto muda de estado, todos os seus dependentes são notificados automaticamente.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>O objeto principal é o <strong>Subject</strong> (ou "Sujeito").</li>
              <li>Os objetos dependentes são os <strong>Observers</strong> (ou "Observadores").</li>
            </ul>
            <p>
              O Subject mantém uma lista de Observers e os notifica quando ocorre alguma mudança.
            </p>
          </div>
        </div>
      </Section>

      {/* UML Section */}
      <Section id="uml" title="4. Estrutura UML" variant="gradient">
        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-accent">Antes do Pattern</h3>
            <img 
              src={diagramBefore} 
              alt="Diagrama UML antes do padrão" 
              className="w-full max-w-3xl mx-auto rounded-xl shadow-card bg-white p-6"
            />
            <Card className="mt-6 p-6 bg-muted">
              <p className="text-foreground">
                A <code className="bg-background px-2 py-1 rounded text-sm">NewsAgency</code> está 
                fortemente acoplada aos canais (<code className="bg-background px-2 py-1 rounded text-sm">NewsChannel</code>). 
                Se precisar:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 ml-4">
                <li>adicionar um novo canal,</li>
                <li>remover um canal,</li>
                <li>ou mudar a classe NewsChannel..</li>
              </ul>
              <p className="mt-3 text-foreground">
                Terá que mexer no código da NewsAgency. E isso quebra o princípio aberto/fechado 
                (Open/Closed Principle) da orientação a objetos.
              </p>
            </Card>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 text-accent">Depois do Pattern</h3>
            <img 
              src={diagramAfter} 
              alt="Diagrama UML depois do padrão" 
              className="w-full max-w-3xl mx-auto rounded-xl shadow-card bg-white p-6"
            />
            
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-primary/5 border-primary/30">
                <h4 className="font-semibold text-primary mb-4 text-lg">Benefícios</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Baixo acoplamento entre classes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Alta flexibilidade e reutilização</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Facilidade para adicionar novos observadores</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>Respeito aos princípios SOLID (principalmente OCP e DIP)</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-accent/5 border-accent/30">
                <h4 className="font-semibold text-accent mb-4 text-lg">Resumo das relações</h4>
                <ul className="space-y-2 text-sm">
                  <li>• NewsAgency → implementa ISubject</li>
                  <li>• NewsChannel → implementa IObserver</li>
                  <li>• NewsAgency → mantém uma lista de IObserver (associação)</li>
                  <li>• ISubject → depende de IObserver para enviar notificações</li>
                  <li>• Notify() → chama Update() de cada observador inscrito</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* Implementação Section */}
      <Section id="implementacao" title="5. Implementação em C#">
        <div className="space-y-8">
          <img 
            src={diagramImplementation} 
            alt="Diagrama de implementação" 
            className="w-full max-w-2xl mx-auto rounded-xl shadow-card bg-white p-6"
          />
          
          <CodeBlock code={solutionCode} title="Implementação completa" />
          
          <div>
            <h4 className="text-xl font-semibold mb-4 text-accent">Saída esperada:</h4>
            <CodeBlock code={outputCode} />
          </div>
        </div>
      </Section>

      {/* Análise Final Section */}
      <Section id="analise" title="6. Análise final" variant="gradient">
        <div className="space-y-8">
          <Card className="p-8 bg-card shadow-card">
            <h4 className="text-xl font-semibold mb-6 text-primary">
              Características do código resultante:
            </h4>
            <ul className="space-y-3 text-foreground">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span><strong>Baixo acoplamento:</strong> o Subject não conhece detalhes dos Observers.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Alta flexibilidade:</strong> é possível adicionar ou remover observadores em 
                  tempo de execução.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Aberto para extensão, fechado para modificação:</strong> novos observadores 
                  podem ser criados sem alterar o código existente.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Aplicabilidade:</strong> ideal para sistemas de eventos, notificações, 
                  interfaces gráficas e streaming de dados.
                </span>
              </li>
            </ul>
          </Card>

          <Card className="p-8 bg-destructive/10 border-destructive/30">
            <h4 className="text-xl font-semibold mb-6 text-destructive">Desvantagens:</h4>
            <ul className="space-y-3 text-foreground">
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <span>
                  Pode gerar notificações em cascata (quando um observer muda o estado e notifica outros).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <span>Requer atenção à ordem de atualização e consistência de dados.</span>
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-lg font-semibold mb-2">Observer Pattern</p>
          <p className="text-white/80 text-sm">
            Design Pattern Comportamental | Documentação Técnica | Samuel Maciel dos Santos e Laura Gabriele Teixeira
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
